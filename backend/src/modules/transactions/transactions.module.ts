import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';

@Module({
  controllers: [TransactionsController, LoansController],
  providers: [TransactionsService, LoansService],
  exports: [TransactionsService, LoansService],
})
export class TransactionsModule {}
