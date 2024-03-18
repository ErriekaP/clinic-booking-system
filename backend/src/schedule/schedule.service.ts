// work-schedule.service.ts
import { Injectable } from '@nestjs/common';
import { WorkScheduleDto } from './schedule.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkScheduleService {
  constructor(private prisma: PrismaService) {}

  async createWorkSchedule(data: WorkScheduleDto): Promise<void> {
    await this.prisma.workSchedule.create({
      data: {
        timeFrom: data.timeFrom,
        timeTo: data.timeTo,
      },
    });
  }
}
