import { Role } from '@prisma/client';
export declare class CreateStaffDto {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: Role;
}
export declare class UpdateRoleDto {
    role: Role;
}
