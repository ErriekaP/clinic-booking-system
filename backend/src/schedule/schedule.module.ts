import { Module } from '@nestjs/common';
import { WorkScheduleService } from './schedule.service';
import { WorkScheduleController } from './schedule.controller';
import { SupabaseService } from 'supabase/supabase.service';
import { AppointmentService } from '../appointment/appointment.service';
import { ServicesService } from '../services/services.service';
import { EmailSenderModule } from 'src/emailSender/EmailSender.module';
import { PatientService } from 'src/patient/patient.service';
import { PersonnelService } from 'src/personnel/personnel.service';

@Module({
  imports: [EmailSenderModule],
  controllers: [WorkScheduleController],
  providers: [
    WorkScheduleService,
    SupabaseService,
    AppointmentService,
    ServicesService,
    PatientService,
    PersonnelService,
  ],
})
export class ScheduleModule {}
