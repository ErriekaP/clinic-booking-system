import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, SupabaseService],
})
export class AppointmentModule {}
