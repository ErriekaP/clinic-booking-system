// patient.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { afterAppointmentService } from './afterAppointment.service';
import {
  CreateAfterAppointmentDto,
  CreatePhysicalExamDto,
} from './afterAppointment.dto';

@Controller('afterAppointment')
export class afterAppointmentController {
  constructor(
    private readonly afterAppointmentsService: afterAppointmentService,
  ) {}

  @Post('add')
  async createAfterAppointment(
    @Body() createAfterAppointmentDto: CreateAfterAppointmentDto,
  ) {
    return this.afterAppointmentsService.createAfterAppointment(
      createAfterAppointmentDto,
    );
  }

  @Post('update/:id')
  async updateServicesInfo(
    @Param('id') id: string,
    @Body() serviceData: any,
  ): Promise<any> {
    const serviceId = parseInt(id, 10);
    return this.afterAppointmentsService.updateService(serviceId, serviceData);
  }

  @Get('/:id')
  async getAppointmentsByPatientID(@Param('id') patientID: string) {
    const id = parseInt(patientID, 10);
    return this.afterAppointmentsService.getAfterAppointmentId(id);
  }

  @Get()
  async findAll() {
    try {
      const services = await this.afterAppointmentsService.getAllServices();
      return services;
    } catch (error) {
      throw new Error(`Unable to fetch services: ${error.message}`);
    }
  }

  @Post('pe/add')
  async createPE(@Body() createPhysicalExamDto: CreatePhysicalExamDto) {
    return this.afterAppointmentsService.createPhysicalExam(
      createPhysicalExamDto,
    );
  }

  @Get('/physicalExam/:id')
  async getAfterAppointment(@Param('id') appointmentID: string) {
    const parsedId = parseInt(appointmentID, 10);

    return this.afterAppointmentsService.getPhysicalExam(parsedId);
  }

  // @Get(':id/personnel')
  // async getServiceWithPersonnelAndSchedules(
  //   @Param('id') id: string,
  // ): Promise<AfterAppointment> {
  //   const serviceId = parseInt(id, 10); // Parse the string ID to a number

  //   const service =
  //     await this.afterAppointmentsService.getServiceWithPersonnelAndSchedules(
  //       serviceId,
  //     );

  //   if (!service) {
  //     throw new NotFoundException(`Service with id ${id} not found`);
  //   }

  //   return service;
  // }
}
