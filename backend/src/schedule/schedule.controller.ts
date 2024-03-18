// work-schedule.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { WorkScheduleService } from './schedule.service';
import { WorkScheduleDto } from './schedule.dto';

@Controller('schedule')
export class WorkScheduleController {
  constructor(private readonly workScheduleService: WorkScheduleService) {}

  @Post('add')
  async createWorkSchedule(@Body() data: WorkScheduleDto): Promise<void> {
    await this.workScheduleService.createWorkSchedule(data);
  }
}
