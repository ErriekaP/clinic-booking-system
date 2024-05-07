// patient.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PersonnelService } from './personnel.service';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Get()
  async findAll() {
    try {
      const personnel = await this.personnelService.getAllPersonnel();
      return personnel;
    } catch (error) {
      throw new Error(`Unable to fetch patients: ${error.message}`);
    }
  }

  @Get('/doctor')
  async findAllDoctor() {
    try {
      const personnel = await this.personnelService.getAllDoctor();
      return personnel;
    } catch (error) {
      throw new Error(`Unable to fetch patients: ${error.message}`);
    }
  }

  @Get(':id')
  async getPersonnelServices(@Param('id') personnelId: string) {
    try {
      const personnelWithServices =
        await this.personnelService.getPersonnelWithServices(personnelId);
      return { success: true, data: personnelWithServices };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch personnel services',
      };
    }
  }
  @Post('update/:id')
  async addPersonnelInfo(
    @Param('id') id: string,
    @Body() personnelData: any,
  ): Promise<any> {
    const personnelId = parseInt(id, 10); // Parse the string ID to a number
    return this.personnelService.updatePersonnel(personnelId, personnelData);
  }

  @Get('appointments/:id')
  async getPersonnelAppointments(@Param('id') id: string): Promise<any> {
    const patientId = parseInt(id, 10);
    return this.personnelService.getPersonnelAppointments(patientId);
  }

  @Get('appointments/nullPatient/:id')
  async getNullPatientAppointments(@Param('id') id: string): Promise<any> {
    const patientId = parseInt(id, 10);
    return this.personnelService.getNullPatientAppointments(patientId);
  }
}
