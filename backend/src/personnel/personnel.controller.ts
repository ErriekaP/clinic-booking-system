// patient.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PersonnelService } from './personnel.service';
import { ClinicPersonnel } from '@prisma/client';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  //   @Post('registerpersonnel')
  //   async addPatient(@Body() patientData: any): Promise<any> {
  //     return this.personnelService.addPatient(patientData);
  //   }

  @Post('addpersonnel/:id')
  async addPersonnelInfo(
    @Param('id') id: string,
    @Body() patientData: any,
  ): Promise<any> {
    const patientId = parseInt(id, 10); // Parse the string ID to a number
    return this.personnelService.updatePersonnel(patientId, patientData);
  }

  @Get(':id')
  async getPersonnel(@Param('id') id: string): Promise<ClinicPersonnel> {
    return this.personnelService.findPersonnel(id);
  }

  @Get()
  async findAll() {
    try {
      const personnel = await this.personnelService.getAllPersonnel();
      return personnel;
    } catch (error) {
      throw new Error(`Unable to fetch patients: ${error.message}`);
    }
  }
}
