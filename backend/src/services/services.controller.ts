// patient.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
}
