import { PrismaService } from '../../database/prisma.service';
import { CreateStaffDto, UpdateRoleDto } from './dto/superadmin.dto';
export declare class SuperadminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllStaff(): Promise<({
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
    createStaffUser(dto: CreateStaffDto): Promise<{
        user: {
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
        } & {
            id: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            isMfaEnabled: boolean;
            mfaSecret: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        temporaryPassword: string;
    }>;
    updateUserRole(userId: string, dto: UpdateRoleDto): Promise<{
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
    deactivateStaffUser(userId: string): Promise<{
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        isMfaEnabled: boolean;
        mfaSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
