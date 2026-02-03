import { IsOptional, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { KycStatus } from '@prisma/client';

export class SearchUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  query?: string;
}

export class UpdateKycStatusDto {
  @ApiProperty({ enum: KycStatus })
  @IsNotEmpty()
  @IsEnum(KycStatus)
  status: KycStatus;
}
