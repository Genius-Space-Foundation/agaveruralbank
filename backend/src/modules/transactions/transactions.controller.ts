import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { TransferDto } from './dto/transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post('transfer')
  @ApiOperation({ summary: 'Initiate a fund transfer' })
  transfer(@Request() req, @Body() dto: TransferDto) {
    return this.transactionsService.transfer(req.user.id, dto);
  }

  @Get('history/:accountId')
  @ApiOperation({ summary: 'Get transaction history for a specific account' })
  getHistory(@Request() req, @Param('accountId') accountId: string) {
    return this.transactionsService.getHistory(req.user.id, accountId);
  }
}
