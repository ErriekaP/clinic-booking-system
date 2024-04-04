// work-schedule.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WorkScheduleService } from './schedule.service';
import { WorkScheduleDto } from './schedule.dto';

@Controller('schedule')
export class WorkScheduleController {
  constructor(private readonly workScheduleService: WorkScheduleService) {}

  @Post('add')
  async createWorkSchedule(@Body() data: WorkScheduleDto): Promise<void> {
    await this.workScheduleService.createWorkSchedule(data);
  }
  @Get('intervals')
  async getAppointmentsAndRemoveIntervalsByDate(
    @Query('date') date: Date,
    @Query('serviceIds') serviceIds: string,
  ): Promise<{ startTime: string; endTime: string }[]> {
    const parsedServiceIds = serviceIds.split(',').map(Number);

    return this.workScheduleService.getAppointmentsAndRemoveIntervalsByDate(
      date,
      parsedServiceIds,
    );
  }
  // @Get('intervals')
  // async getTimeIntervalsForServices(
  //   @Query('serviceIds') serviceIds: string,
  // ): Promise<{ startTime: string; endTime: string }[]> {
  //   const idsArray = serviceIds.split(',').map(Number);
  //   return await this.workScheduleService.generateTimeIntervalsForServices(
  //     idsArray,
  //   );
  // }
}
