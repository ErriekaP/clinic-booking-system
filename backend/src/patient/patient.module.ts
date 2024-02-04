import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}