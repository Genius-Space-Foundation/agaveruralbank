import { PrismaService } from '../../database/prisma.service';
import { SearchUserDto, UpdateKycStatusDto } from './dto/staff.dto';
export declare class StaffService {
    private prisma;
    constructor(prisma: PrismaService);
    searchUsers(dto: SearchUserDto): Promise<({
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            address: string | null;
            dateOfBirth: Date | null;
            nationalId: string | null;
            kycLevel: number;
            kycStatus: import("@prisma/client").$Enums.KycStatus;
            userId: string;
        } | null;
        accounts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accountNumber: string;
            type: string;
            balance: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
            status: import("@prisma/client").$Enums.AccountStatus;
            userId: string;
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
    getUserDetails(id: string): Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            address: string | null;
            dateOfBirth: Date | null;
            nationalId: string | null;
            kycLevel: number;
            kycStatus: import("@prisma/client").$Enums.KycStatus;
            userId: string;
        } | null;
        accounts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accountNumber: string;
            type: string;
            balance: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
            status: import("@prisma/client").$Enums.AccountStatus;
            userId: string;
        }[];
        auditLogs: {
            id: string;
            createdAt: Date;
            userId: string | null;
            action: string;
            resource: string;
            resourceId: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
        loans: {
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
    updateKycStatus(userId: string, dto: UpdateKycStatusDto): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            isMfaEnabled: boolean;
            mfaSecret: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string | null;
        dateOfBirth: Date | null;
        nationalId: string | null;
        kycLevel: number;
        kycStatus: import("@prisma/client").$Enums.KycStatus;
        userId: string;
    }>;
    getAuditLogs(limit?: number): Promise<({
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
        resourceId: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    })[]>;
}
