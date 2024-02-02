// patient.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async addPatient(@Body() patientData: any): Promise<any> {
    return this.patientService.addPatient(patientData);
  }
}
