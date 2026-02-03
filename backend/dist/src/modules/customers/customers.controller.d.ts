import { CustomersService } from './customers.service';
import { UpdateProfileDto, kycValueDto } from './dto/customer.dto';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    getProfile(req: any): Promise<{
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
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
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
    upgradeKyc(req: any, dto: kycValueDto): Promise<{
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
