import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { UpdateProfileDto, kycValueDto } from './dto/customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Request() req) {
    return this.customersService.getProfile(req.user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile details' })
  updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.customersService.updateProfile(req.user.id, dto);
  }

  @Patch('kyc-upgrade')
  @ApiOperation({ summary: 'Submit national ID for KYC upgrade' })
  upgradeKyc(@Request() req, @Body() dto: kycValueDto) {
    return this.customersService.upgradeKyc(req.user.id, dto);
  }
}
