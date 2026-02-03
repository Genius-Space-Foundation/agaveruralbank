import { PrismaService } from '../../database/prisma.service';
import { TransferDto } from './dto/transaction.dto';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    transfer(userId: string, dto: TransferDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.TransactionType;
        currency: string;
        status: import("@prisma/client").$Enums.TransactionStatus;
        description: string | null;
        reference: string;
        idempotencyKey: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        senderAccountId: string | null;
        receiverAccountId: string | null;
    }>;
    getHistory(userId: string, accountId: string): Promise<({
        senderAccount: {
            accountNumber: string;
        } | null;
        receiverAccount: {
            accountNumber: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.TransactionType;
        currency: string;
        status: import("@prisma/client").$Enums.TransactionStatus;
        description: string | null;
        reference: string;
        idempotencyKey: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        senderAccountId: string | null;
        receiverAccountId: string | null;
    })[]>;
}
