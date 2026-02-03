import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SearchUserDto, UpdateKycStatusDto } from './dto/staff.dto';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async searchUsers(dto: SearchUserDto) {
    const { query } = dto;
    
    if (!query) {
       return this.prisma.user.findMany({
          take: 20,
          include: { profile: true, accounts: true },
          orderBy: { email: 'asc' }
       });
    }

    return this.prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { profile: { firstName: { contains: query, mode: 'insensitive' } } },
          { profile: { lastName: { contains: query, mode: 'insensitive' } } },
          { profile: { nationalId: { contains: query, mode: 'insensitive' } } },
          { accounts: { some: { accountNumber: { contains: query } } } }
        ],
      },
      include: {
        profile: true,
        accounts: true,
      },
      take: 20,
    });
  }

  async getUserDetails(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        accounts: true,
        auditLogs: {
            take: 10,
            orderBy: { createdAt: 'desc' }
        },
        loans: true
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateKycStatus(userId: string, dto: UpdateKycStatusDto) {
    // Determine new level based on verification
    let newLevel = 1;
    if (dto.status === 'VERIFIED') {
        newLevel = 2; // Bump to level 2 on verification
    }

    const profile = await this.prisma.profile.update({
        where: { userId },
        data: {
            kycStatus: dto.status,
            kycLevel: newLevel
        },
        include: { user: true }
    });

    // Create audit log for KYC update
    await this.prisma.auditLog.create({
      data: {
        action: `KYC_${dto.status}`,
        resource: 'Profile',
        resourceId: userId,
        userId: userId,
        metadata: { 
          status: dto.status, 
          previousLevel: profile.kycLevel,
          newLevel 
        },
      },
    });

    return profile;
  }

  async getAuditLogs(limit: number = 50) {
    return this.prisma.auditLog.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: {
                    email: true,
                    profile: {
                        select: { firstName: true, lastName: true }
                    }
                }
            }
        }
    });
  }
}
