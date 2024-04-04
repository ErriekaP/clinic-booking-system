import { Module } from '@nestjs/common';
import { WorkScheduleService } from './schedule.service';
import { WorkScheduleController } from './schedule.controller';
import { SupabaseService } from 'supabase/supabase.service';
import { AppointmentService } from '../appointment/appointment.service';

@Module({
  controllers: [WorkScheduleController],
  providers: [WorkScheduleService, SupabaseService, AppointmentService],
})
export class ScheduleModule {}
