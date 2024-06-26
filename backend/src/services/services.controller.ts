// patient.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('add')
  async addService(@Body() serviceData: any): Promise<any> {
    return this.servicesService.addService(serviceData);
  }

  @Post('update/:id')
  async updateServicesInfo(
    @Param('id') id: string,
    @Body() serviceData: any,
  ): Promise<any> {
    const serviceId = parseInt(id, 10);
    return this.servicesService.updateService(serviceId, serviceData);
  }

  @Get(':id')
  async getServices(@Param('id') id: string): Promise<Service> {
    return this.servicesService.findService(id);
  }

  @Get()
  async findAll() {
    try {
      const services = await this.servicesService.getAllServices();
      return services;
    } catch (error) {
      throw new Error(`Unable to fetch services: ${error.message}`);
    }
  }

  @Get(':id/personnel')
  async getServiceWithPersonnelAndSchedules(
    @Param('id') id: string,
  ): Promise<Service> {
    const serviceId = parseInt(id, 10); // Parse the string ID to a number

    const service =
      await this.servicesService.getServiceWithPersonnelAndSchedules(serviceId);

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return service;
  }

  @Get('count/:serviceId')
  async countDoctorsByService(
    @Param('serviceId') serviceId: string,
  ): Promise<number> {
    const parsedServiceId = parseInt(serviceId, 10); // Parse the serviceId to a number

    try {
      const doctorsCount =
        await this.servicesService.countDoctorsByService(parsedServiceId);

      return doctorsCount;
    } catch (error) {
      throw new NotFoundException(
        `Unable to count doctors by service: ${error.message}`,
      );
    }
  }

  @Get('/pause/:id')
  async getIsPause(@Param('id') id: string): Promise<any> {
    return this.servicesService.processIsPause(id);
  }

  @Get('/resume/:id')
  async getIsNotPause(@Param('id') id: string): Promise<any> {
    return this.servicesService.processIsNotPause(id);
  }
}
