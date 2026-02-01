import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bank account' })
  create(@Request() req, @Body() dto: CreateAccountDto) {
    return this.accountsService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all accounts for the logged-in user' })
  findAll(@Request() req) {
    return this.accountsService.findByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account details by ID' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.accountsService.findById(id, req.user.id);
  }
}
