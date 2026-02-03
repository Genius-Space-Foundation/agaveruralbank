import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CustomersModule } from './modules/customers/customers.module';
import { StaffModule } from './modules/staff/staff.module';
import { SuperadminModule } from './modules/superadmin/superadmin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    AccountsModule,
    TransactionsModule,
    CustomersModule,
    StaffModule,
    SuperadminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
