// Savings Goals Service
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateGoalDto, UpdateGoalAmountDto } from './dto/goal.dto';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateProgress(userId: string, id: string, dto: UpdateGoalAmountDto) {
    const goal = await this.prisma.goal.findFirst({
      where: { id, userId },
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    return this.prisma.goal.update({
      where: { id },
      data: {
        currentAmount: {
          increment: dto.amount,
        },
      },
    });
  }

  async delete(userId: string, id: string) {
    const goal = await this.prisma.goal.findFirst({
      where: { id, userId },
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    return this.prisma.goal.delete({
      where: { id },
    });
  }
}
