import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { SupabaseService } from 'supabase/supabase.service';
import { EmailSenderModule } from 'src/emailSender/EmailSender.module';
import { PatientService } from 'src/patient/patient.service';
import { PersonnelService } from 'src/personnel/personnel.service';

@Module({
  imports: [EmailSenderModule],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    SupabaseService,
    PatientService,
    PersonnelService,
  ],
})
export class AppointmentModule {}
