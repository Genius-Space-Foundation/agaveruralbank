import { PrismaService } from '../../database/prisma.service';
import { UpdateProfileDto, kycValueDto } from './dto/customer.dto';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        user: {
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
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
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
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
    upgradeKyc(userId: string, dto: kycValueDto): Promise<{
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
}
