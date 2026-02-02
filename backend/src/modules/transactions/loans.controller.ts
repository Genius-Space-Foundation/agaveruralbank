import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoansService } from './loans.service';
import { ApplyLoanDto } from './dto/loan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Loans')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions/loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Post('apply')
  @ApiOperation({ summary: 'Apply for a new loan' })
  apply(@Request() req, @Body() dto: ApplyLoanDto) {
    return this.loansService.apply(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user loan applications' })
  findAll(@Request() req) {
    return this.loansService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get loan details' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.loansService.findOne(req.user.id, id);
  }
}
