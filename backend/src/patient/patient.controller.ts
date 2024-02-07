// patient.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { PatientService } from './patient.service';


@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService){}

  @Post()
  async addPatient(@Body() patientData: any): Promise<any> {
    return this.patientService.addPatient(patientData);
  }

  @Get()
  async findAll(){
    try {
      const patients = await this.patientService.getAllPatients();
      return patients;
    } catch (error) {
      throw new Error(`Unable to fetch patients: ${error.message}`);
    }
  }



}
