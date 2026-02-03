import { KycStatus } from '@prisma/client';
export declare class SearchUserDto {
    query?: string;
}
export declare class UpdateKycStatusDto {
    status: KycStatus;
}
