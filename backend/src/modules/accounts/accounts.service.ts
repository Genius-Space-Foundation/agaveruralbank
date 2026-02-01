import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAccountDto } from './dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateAccountDto) {
    // Generate a simple unique account number (In production, use a more robust generator)
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    return this.prisma.account.create({
      data: {
        userId,
        accountNumber,
        type: dto.type,
        currency: dto.currency,
        balance: 0,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      include: {
        _count: {
          select: { sentTransfers: true, receivedTransfers: true },
        },
      },
    });
  }

  async findById(id: string, userId: string) {
    const account = await this.prisma.account.findFirst({
      where: { id, userId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }
}
