import { Module } from '@nestjs/common';
import { WorkScheduleService } from './schedule.service';
import { WorkScheduleController } from './schedule.controller';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [WorkScheduleController],
  providers: [WorkScheduleService, SupabaseService],
})
export class ScheduleModule {}
