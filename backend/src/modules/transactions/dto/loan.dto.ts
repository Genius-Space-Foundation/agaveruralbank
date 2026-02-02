import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyLoanDto {
  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(500)
  amount: number;

  @ApiProperty({ example: 'PERSONAL' })
  @IsString()
  type: string;

  @ApiProperty({ example: 12 })
  @IsNumber()
  @Min(3)
  @Max(60)
  termMonths: number;

  @ApiProperty({ example: 'Business expansion' })
  @IsString()
  purpose: string;
}
