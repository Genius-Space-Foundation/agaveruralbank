import { StaffService } from './staff.service';
import { SearchUserDto, UpdateKycStatusDto } from './dto/staff.dto';
export declare class StaffController {
    private staffService;
    constructor(staffService: StaffService);
    searchUsers(query: SearchUserDto): Promise<({
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            address: string | null;
            dateOfBirth: Date | null;
            nationalId: string | null;
            kycLevel: number;
            kycStatus: import("@prisma/client").$Enums.KycStatus;
        } | null;
        accounts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            accountNumber: string;
            type: string;
            balance: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
            status: import("@prisma/client").$Enums.AccountStatus;
        }[];
    } & {
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        isMfaEnabled: boolean;
        mfaSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getUser(id: string): Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            address: string | null;
            dateOfBirth: Date | null;
            nationalId: string | null;
            kycLevel: number;
            kycStatus: import("@prisma/client").$Enums.KycStatus;
        } | null;
        accounts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            accountNumber: string;
            type: string;
            balance: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
            status: import("@prisma/client").$Enums.AccountStatus;
        }[];
        auditLogs: {
            id: string;
            createdAt: Date;
            userId: string | null;
            action: string;
            resource: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
        loans: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: string;
            status: import("@prisma/client").$Enums.LoanStatus;
            amount: import("@prisma/client-runtime-utils").Decimal;
            interestRate: import("@prisma/client-runtime-utils").Decimal;
            termMonths: number;
            purpose: string;
        }[];
    } & {
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        isMfaEnabled: boolean;
        mfaSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateKyc(id: string, dto: UpdateKycStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string | null;
        dateOfBirth: Date | null;
        nationalId: string | null;
        kycLevel: number;
        kycStatus: import("@prisma/client").$Enums.KycStatus;
    }>;
    getAuditLogs(limit: string): Promise<({
        user: {
            email: string;
            profile: {
                firstName: string;
                lastName: string;
            } | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        resource: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    })[]>;
}
