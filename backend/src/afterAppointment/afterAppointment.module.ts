import { Module } from '@nestjs/common';
import { afterAppointmentController } from './afterAppointment.controller';
import { afterAppointmentService } from './afterAppointment.service';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [afterAppointmentController],
  providers: [afterAppointmentService, SupabaseService],
})
export class AfterAppointmentModule {}
