// patient.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { Queue } from '@prisma/client';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add')
  async addQueue(@Body() queueData: any): Promise<any> {
    return this.queueService.addQueue(queueData);
  }

  @Post('update/:id')
  async updateServicesInfo(
    @Param('id') id: string,
    @Body() serviceData: any,
  ): Promise<any> {
    const serviceId = parseInt(id, 10);
    return this.queueService.updateService(serviceId, serviceData);
  }

  @Get('patient/:id')
  async getPatientQueue(@Param('id') id: string): Promise<any> {
    return this.queueService.findPatientQueue(id);
  }

  @Get(':id')
  async getQueue(@Param('id') id: string): Promise<any> {
    return this.queueService.processNextQueue(id);
  }

  @Get()
  async findAll() {
    try {
      const services = await this.queueService.getAllQueues();
      return services;
    } catch (error) {
      throw new Error(`Unable to fetch services: ${error.message}`);
    }
  }

  // @Get(':id/personnel')
  // async getServiceWithPersonnelAndSchedules(
  //   @Param('id') id: string,
  // ): Promise<Queue> {
  //   const serviceId = parseInt(id, 10); // Parse the string ID to a number

  //   const service =
  //     await this.queueService.getServiceWithPersonnelAndSchedules(serviceId);

  //   if (!service) {
  //     throw new NotFoundException(`Service with id ${id} not found`);
  //   }

  //   return service;
  // }

  @Get('count/:serviceId')
  async countDoctorsByService(
    @Param('serviceId') serviceId: string,
  ): Promise<number> {
    const parsedServiceId = parseInt(serviceId, 10); // Parse the serviceId to a number

    try {
      const doctorsCount =
        await this.queueService.countDoctorsByService(parsedServiceId);

      return doctorsCount;
    } catch (error) {
      throw new NotFoundException(
        `Unable to count doctors by service: ${error.message}`,
      );
    }
  }
}
