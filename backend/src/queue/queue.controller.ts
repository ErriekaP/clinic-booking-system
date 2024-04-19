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

  @Get('/next/:id')
  async getQueue(@Param('id') id: string): Promise<any> {
    return this.queueService.processNextQueue(id);
  }

  @Get('/finish/:id')
  async getFinishQueue(@Param('id') id: string): Promise<any> {
    return this.queueService.finishQueue(id);
  }

  @Get()
  async findAll() {
    try {
      const queues = await this.queueService.getAllQueues();
      return queues;
    } catch (error) {
      throw new Error(`Unable to fetch queues: ${error.message}`);
    }
  }

  @Get('ongoing/:id')
  async findAllOngoingQueues(@Param('id') serviceId: string) {
    const parsedId = parseInt(serviceId, 10);

    try {
      const queues = await this.queueService.getAllOngoingQueues(parsedId);
      return queues;
    } catch (error) {
      throw new Error(`Unable to fetch queues: ${error.message}`);
    }
  }

  @Get('ongoing/patient/:id')
  async findPatientQueue(@Param('id') patientID: string) {
    const parsedId = parseInt(patientID, 10);

    try {
      const queues = await this.queueService.getPatientQueue(parsedId);
      return queues;
    } catch (error) {
      throw new Error(`Unable to fetch queues: ${error.message}`);
    }
  }

  @Get('ongoing/personnel/:id')
  async findAllOngoingQueuesPersonnel(@Param('id') personnelId: string) {
    const parsedId = parseInt(personnelId, 10);

    try {
      const queues =
        await this.queueService.getAllOngoingQueuesPersonnel(parsedId);
      return queues;
    } catch (error) {
      throw new Error(`Unable to fetch queues: ${error.message}`);
    }
  }

  @Get('allOngoing')
  async findQueueswithService() {
    try {
      const queues = await this.queueService.getQueueswithService();
      return queues;
    } catch (error) {
      throw new Error(`Unable to fetch queues: ${error.message}`);
    }
  }

  @Get('current/:id')
  async getQueuewithCurrentNumber(@Param('id') id: string): Promise<Queue> {
    const currentNumber = parseInt(id, 10); // Parse the string ID to a number

    const queue =
      await this.queueService.getQueuewithCurrentNumber(currentNumber);

    if (!queue) {
      throw new NotFoundException(`Queue with id ${id} not found`);
    }

    return queue;
  }

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
