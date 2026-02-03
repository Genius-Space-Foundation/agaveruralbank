import { PrismaService } from '../../database/prisma.service';
import { CreateGoalDto, UpdateGoalAmountDto } from './dto/goal.dto';
export declare class GoalsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateGoalDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        userId: string;
        title: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        userId: string;
        title: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
    }[]>;
    updateProgress(userId: string, id: string, dto: UpdateGoalAmountDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        userId: string;
        title: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
    }>;
    delete(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        userId: string;
        title: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
    }>;
}
