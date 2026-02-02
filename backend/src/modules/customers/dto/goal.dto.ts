import { IsString, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty({ example: 'Buy New Tractor' })
  @IsString()
  title: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(1)
  targetAmount: number;

  @ApiProperty({ example: 'GHS' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: '2026-12-31', required: false })
  @IsDateString()
  @IsOptional()
  deadline?: string;
}

export class UpdateGoalAmountDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  amount: number;
}
