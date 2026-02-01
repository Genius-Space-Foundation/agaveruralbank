import { PrismaService } from '../../database/prisma.service';
import { CreateAccountDto } from './dto/account.dto';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateAccountDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        type: string;
        balance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("@prisma/client").$Enums.AccountStatus;
        userId: string;
    }>;
    findByUser(userId: string): Promise<({
        _count: {
            sentTransfers: number;
            receivedTransfers: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        type: string;
        balance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("@prisma/client").$Enums.AccountStatus;
        userId: string;
    })[]>;
    findById(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountNumber: string;
        type: string;
        balance: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        status: import("@prisma/client").$Enums.AccountStatus;
        userId: string;
    }>;
}
