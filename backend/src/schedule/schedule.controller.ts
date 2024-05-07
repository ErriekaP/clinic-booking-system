// work-schedule.controller.ts
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { WorkScheduleService } from './schedule.service';
import { WorkScheduleDto } from './schedule.dto';
import { Interval } from './schedule.dto';

@Controller('schedule')
export class WorkScheduleController {
  constructor(private readonly workScheduleService: WorkScheduleService) {}

  @Post('add')
  async createWorkSchedule(@Body() data: WorkScheduleDto): Promise<void> {
    await this.workScheduleService.createWorkSchedule(data);
  }
  @Get()
  async findAll() {
    try {
      const schedule = await this.workScheduleService.getAllschedules();
      return schedule;
    } catch (error) {
      throw new Error(`Unable to fetch schedules: ${error.message}`);
    }
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

  @Get('available-doctors')
  async findAvailableDoctors(
    @Query() interval: Interval,
    @Query('date') date: Date,
    @Query('serviceId') serviceId: string,
  ): Promise<any[]> {
    //const parsedServiceIds = serviceIds.split(',').map(Number);
    const parsedServiceId = Number(serviceId);

    return this.workScheduleService.findAvailablePersonnel(
      date,
      interval,
      parsedServiceId,
    );
  }
}
