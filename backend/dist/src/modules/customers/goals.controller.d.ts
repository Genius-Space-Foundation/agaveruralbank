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
        title: string;
        userId: string;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        deadline: Date | null;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(req: any): Promise<{
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
    updateProgress(req: any, id: string, dto: UpdateGoalAmountDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
