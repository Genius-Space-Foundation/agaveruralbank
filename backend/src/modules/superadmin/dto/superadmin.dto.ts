import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateStaffDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;
}

export class UpdateRoleDto {
  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
