import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointments } from '@prisma/client';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('add')
  async addAppointment(@Body() appointmentData: any): Promise<any> {
    return this.appointmentService.addAppointment(appointmentData);
  }

  @Post('update/:id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() appointmentData: any,
  ): Promise<any> {
    return this.appointmentService.updateAppointment(id, appointmentData);
  }

  @Get()
  async findAll() {
    try {
      const appointment = await this.appointmentService.getAllAppointments();
      return appointment;
    } catch (error) {
      throw new Error(`Unable to fetch appointments: ${error.message}`);
    }
  }

  @Get(':id')
  async getPatientAppointments(@Param('id') id: string): Promise<any> {
    const patientId = parseInt(id, 10);
    return this.appointmentService.getPatientAppointments(patientId);
  }
}
