// patient.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from '@prisma/client';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('registerpatients')
  async addPatient(@Body() patientData: any): Promise<any> {
    return this.patientService.addPatient(patientData);
  }

  @Post('addpatients/:id')
  async addPatientInfo(
    @Param('id') id: string,
    @Body() patientData: any,
  ): Promise<any> {
    const patientId = parseInt(id, 10); // Parse the string ID to a number
    return this.patientService.updatePatient(patientId, patientData);
  }

  @Get(':id')
  async getPatient(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findPatient(id);
  }

  @Get()
  async findAll() {
    try {
      const patients = await this.patientService.getAllPatients();
      return patients;
    } catch (error) {
      throw new Error(`Unable to fetch patients: ${error.message}`);
    }
  }
}
