import { PrismaService } from '../../database/prisma.service';
import { ApplyLoanDto } from './dto/loan.dto';
export declare class LoansService {
    private prisma;
    constructor(prisma: PrismaService);
    apply(userId: string, dto: ApplyLoanDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: import("@prisma/client").$Enums.LoanStatus;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        termMonths: number;
        purpose: string;
        interestRate: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: import("@prisma/client").$Enums.LoanStatus;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        termMonths: number;
        purpose: string;
        interestRate: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: import("@prisma/client").$Enums.LoanStatus;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        termMonths: number;
        purpose: string;
        interestRate: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
