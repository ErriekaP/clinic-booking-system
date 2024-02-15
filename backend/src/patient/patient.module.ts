import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, SupabaseService],
})
export class PatientModule {}
