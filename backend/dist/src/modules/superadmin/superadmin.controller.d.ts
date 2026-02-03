import { SuperadminService } from './superadmin.service';
import { CreateStaffDto, UpdateRoleDto } from './dto/superadmin.dto';
export declare class SuperadminController {
    private superadminService;
    constructor(superadminService: SuperadminService);
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
    createStaff(dto: CreateStaffDto): Promise<{
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
    updateRole(id: string, dto: UpdateRoleDto): Promise<{
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
    deactivateStaff(id: string): Promise<{
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
