import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/account.dto';
export declare class AccountsController {
    private accountsService;
    constructor(accountsService: AccountsService);
    create(req: any, dto: CreateAccountDto): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<{
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
