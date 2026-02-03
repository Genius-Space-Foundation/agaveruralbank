import { GoalsService } from './goals.service';
import { CreateGoalDto, UpdateGoalAmountDto } from './dto/goal.dto';
export declare class GoalsController {
    private goalsService;
    constructor(goalsService: GoalsService);
    create(req: any, dto: CreateGoalDto): Promise<{
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
    findAll(req: any): Promise<{
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
    updateProgress(req: any, id: string, dto: UpdateGoalAmountDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
