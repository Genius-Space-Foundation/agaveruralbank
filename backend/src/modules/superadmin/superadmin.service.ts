import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateStaffDto, UpdateRoleDto } from './dto/superadmin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperadminService {
  constructor(private prisma: PrismaService) {}

  async getAllStaff() {
    return this.prisma.user.findMany({
      where: {
        role: {
          in: ['TELLER', 'ADMIN', 'SUPERADMIN'],
        },
      },
      include: {
        profile: true,
      },
      orderBy: { email: 'asc' },
    });
  }

  async createStaffUser(dto: CreateStaffDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Generate temporary password
    const tempPassword = `Agave${Math.floor(1000 + Math.random() * 9000)}!`;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        profile: {
          create: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            phoneNumber: dto.phoneNumber,
            kycLevel: 2,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    // Create audit log for staff creation
    await this.prisma.auditLog.create({
      data: {
        action: 'STAFF_USER_CREATED',
        resource: 'User',
        resourceId: user.id,
        userId: user.id,
        metadata: { 
          email: user.email, 
          role: dto.role,
          createdBy: 'SUPERADMIN'
        },
      },
    });

    return {
      user,
      temporaryPassword: tempPassword,
    };
  }

  async updateUserRole(userId: string, dto: UpdateRoleDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: dto.role },
      include: { profile: true },
    });
  }

  async deactivateStaffUser(userId: string) {
    // For now, we'll just change their role to CUSTOMER to "deactivate" them
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: 'CUSTOMER' },
    });
  }
}
