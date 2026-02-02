import { Controller, Post, Body, Get, UseGuards, Request, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GoalsService } from './goals.service';
import { CreateGoalDto, UpdateGoalAmountDto } from './dto/goal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Goals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers/goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new savings goal' })
  create(@Request() req, @Body() dto: CreateGoalDto) {
    return this.goalsService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all savings goals for user' })
  findAll(@Request() req) {
    return this.goalsService.findAll(req.user.id);
  }

  @Patch(':id/progress')
  @ApiOperation({ summary: 'Update goal progress (increment)' })
  updateProgress(@Request() req, @Param('id') id: string, @Body() dto: UpdateGoalAmountDto) {
    return this.goalsService.updateProgress(req.user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a goal' })
  remove(@Request() req, @Param('id') id: string) {
    return this.goalsService.delete(req.user.id, id);
  }
}
