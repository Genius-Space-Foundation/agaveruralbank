import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AccountType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT',
  SUSU = 'SUSU',
}

export class CreateAccountDto {
  @ApiProperty({ enum: AccountType, example: AccountType.SAVINGS })
  @IsEnum(AccountType)
  type: AccountType;

  @ApiProperty({ example: 'GHS' })
  @IsString()
  @IsNotEmpty()
  currency: string;
}
