import { Controller, Get, Post, Body, Param, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { StaffService } from './staff.service';
import { SearchUserDto, UpdateKycStatusDto } from './dto/staff.dto';

@ApiTags('Staff Portal')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.TELLER, Role.SUPERADMIN) // Allow all staff roles
@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get('users')
  @ApiOperation({ summary: 'Search for customers' })
  async searchUsers(@Query() query: SearchUserDto) {
    return this.staffService.searchUsers(query);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get detailed user profile' })
  async getUser(@Param('id') id: string) {
    return this.staffService.getUserDetails(id);
  }

  @Put('users/:id/kyc')
  @ApiOperation({ summary: 'Update user KYC status' })
  async updateKyc(@Param('id') id: string, @Body() dto: UpdateKycStatusDto) {
    return this.staffService.updateKycStatus(id, dto);
  }

  @Get('audit')
  @ApiOperation({ summary: 'Get recent system audit logs' })
  async getAuditLogs(@Query('limit') limit: string) {
    return this.staffService.getAuditLogs(limit ? parseInt(limit) : 50);
  }
}
