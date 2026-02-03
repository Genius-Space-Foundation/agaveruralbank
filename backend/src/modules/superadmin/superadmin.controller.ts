import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { SuperadminService } from './superadmin.service';
import { CreateStaffDto, UpdateRoleDto } from './dto/superadmin.dto';

@ApiTags('SuperAdmin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPERADMIN)
@Controller('superadmin')
export class SuperadminController {
  constructor(private superadminService: SuperadminService) {}

  @Get('staff')
  @ApiOperation({ summary: 'Get all staff users' })
  async getAllStaff() {
    return this.superadminService.getAllStaff();
  }

  @Post('staff')
  @ApiOperation({ summary: 'Create new staff user' })
  async createStaff(@Body() dto: CreateStaffDto) {
    return this.superadminService.createStaffUser(dto);
  }

  @Put('staff/:id/role')
  @ApiOperation({ summary: 'Update staff user role' })
  async updateRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.superadminService.updateUserRole(id, dto);
  }

  @Delete('staff/:id')
  @ApiOperation({ summary: 'Deactivate staff user' })
  async deactivateStaff(@Param('id') id: string) {
    return this.superadminService.deactivateStaffUser(id);
  }
}
