import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
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

  @Get('/pending')
  async getPendingAppointments() {
    try {
      const appointments =
        await this.appointmentService.getPendingAppointments();
      return appointments;
    } catch (error) {
      throw new Error(`Unable to fetch appointments: ${error.message}`);
    }
  }
  @Get('check')
  async findAppointmentsByDate(@Query('date') date: Date) {
    return this.appointmentService.findAppointmentsByDate(date);
  }

  @Get(':id')
  async getAppointment(@Param('id') id: string): Promise<Appointments> {
    return this.appointmentService.findAppointment(id);
  }
}
