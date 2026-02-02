import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';

@Module({
  controllers: [CustomersController, GoalsController],
  providers: [CustomersService, GoalsService],
  exports: [CustomersService, GoalsService],
})
export class CustomersModule {}
