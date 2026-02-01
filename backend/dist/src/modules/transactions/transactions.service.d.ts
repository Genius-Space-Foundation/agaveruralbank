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
        senderAccountId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        idempotencyKey: string | null;
        reference: string;
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
        senderAccountId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        idempotencyKey: string | null;
        reference: string;
        receiverAccountId: string | null;
    })[]>;
}
