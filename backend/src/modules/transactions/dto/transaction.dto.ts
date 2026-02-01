import { IsNumber, IsNotEmpty, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty({ example: 'sender-account-uuid' })
  @IsString()
  @IsNotEmpty()
  senderAccountId: string;

  @ApiProperty({ example: '1234567890' }) // Assuming account number for receiver
  @IsString()
  @IsNotEmpty()
  receiverAccountNumber: string;

  @ApiProperty({ example: 100.00 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: 'Payment for services', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'unique-idempotency-key' })
  @IsString()
  @IsNotEmpty()
  idempotencyKey: string;
}
