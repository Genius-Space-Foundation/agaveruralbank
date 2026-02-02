import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ApplyLoanDto } from './dto/loan.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  async apply(userId: string, dto: ApplyLoanDto) {
    // Basic interest rate logic for simulation
    let interestRate = 15.0; // Base rate
    if (dto.type === 'FARM') interestRate = 10.0; // Support farmers
    if (dto.type === 'BUSINESS') interestRate = 12.5;

    return this.prisma.loan.create({
      data: {
        ...dto,
        interestRate,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.loan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const loan = await this.prisma.loan.findFirst({
      where: { id, userId },
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    return loan;
  }
}
