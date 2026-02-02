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
        title: string;
        userId: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        title: string;
        userId: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    updateProgress(userId: string, id: string, dto: UpdateGoalAmountDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        title: string;
        userId: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    delete(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        title: string;
        userId: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
