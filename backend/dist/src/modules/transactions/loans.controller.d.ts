import { LoansService } from './loans.service';
import { ApplyLoanDto } from './dto/loan.dto';
export declare class LoansController {
    private loansService;
    constructor(loansService: LoansService);
    apply(req: any, dto: ApplyLoanDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: import("@prisma/client").$Enums.LoanStatus;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        interestRate: import("@prisma/client-runtime-utils").Decimal;
        termMonths: number;
        purpose: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: import("@prisma/client").$Enums.LoanStatus;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        interestRate: import("@prisma/client-runtime-utils").Decimal;
        termMonths: number;
        purpose: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: import("@prisma/client").$Enums.LoanStatus;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        interestRate: import("@prisma/client-runtime-utils").Decimal;
        termMonths: number;
        purpose: string;
    }>;
}
