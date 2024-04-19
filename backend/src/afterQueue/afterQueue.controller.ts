// patient.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { afterQueueService } from './afterQueue.service';
import { AfterAppointment } from '@prisma/client';
import { CreateAfterQueueDto, CreateMedicineDto } from './afterQueue.dto';

@Controller('afterQueue')
export class afterQueueController {
  constructor(private readonly afterQueueService: afterQueueService) {}

  @Post('add')
  async createAfterQueue(@Body() createAfterQueueDto: CreateAfterQueueDto) {
    return this.afterQueueService.createAfterQueue(createAfterQueueDto);
  }
  @Post('update/:id')
  async updateServicesInfo(
    @Param('id') id: string,
    @Body() serviceData: any,
  ): Promise<any> {
    const serviceId = parseInt(id, 10);
    return this.afterQueueService.updateService(serviceId, serviceData);
  }

  // @Get(':id')
  // async getServices(@Param('id') id: string): Promise<AfterAppointment> {
  //   return this.afterAppointmentsService.findService(id);
  // }

  @Get()
  async findAll() {
    try {
      const services = await this.afterQueueService.getAllServices();
      return services;
    } catch (error) {
      throw new Error(`Unable to fetch services: ${error.message}`);
    }
  }
}
