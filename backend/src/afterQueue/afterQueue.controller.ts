// patient.controller.ts
import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { afterQueueService } from './afterQueue.service';
import {
  CreateAfterQueueDto,
  CreatePhysicalExamDto,
  UpdateAfterQueueCheckupDto,
} from './afterQueue.dto';

@Controller('afterQueue')
export class afterQueueController {
  constructor(private readonly afterQueueService: afterQueueService) {}

  @Get('/physicalExam/:id')
  async getAfterQueue(@Param('id') queueID: string) {
    const parsedId = parseInt(queueID, 10);

    return this.afterQueueService.getPhysicalExam(parsedId);
  }

  @Put('checkup/:id')
  async checkupUpdate(
    @Param('id') id: number,
    @Body() updateAfterQueueCheckupDto: UpdateAfterQueueCheckupDto,
  ) {
    return this.afterQueueService.checkupUpdate(
      Number(id),
      updateAfterQueueCheckupDto,
    );
  }

  @Post('add')
  async createAfterQueue(@Body() createAfterQueueDto: CreateAfterQueueDto) {
    return this.afterQueueService.createAfterQueue(createAfterQueueDto);
  }
  @Post('pe/add')
  async createPE(@Body() createPhysicalExamDto: CreatePhysicalExamDto) {
    return this.afterQueueService.createPhysicalExam(createPhysicalExamDto);
  }
  @Post('update/:id')
  async updateServicesInfo(
    @Param('id') id: string,
    @Body() serviceData: any,
  ): Promise<any> {
    const serviceId = parseInt(id, 10);
    return this.afterQueueService.updateService(serviceId, serviceData);
  }

  @Post('pe/update/:id')
  async updatePhysicalExam(
    @Param('id') id: string,
    @Body() peData: any,
  ): Promise<any> {
    const peId = parseInt(id, 10);
    return this.afterQueueService.updatePhysicalExam(peId, peData);
  }
  @Get()
  async findAll() {
    try {
      const afterQueues = await this.afterQueueService.getAllAfterQueues();
      return afterQueues;
    } catch (error) {
      throw new Error(`Unable to fetch afterQueues: ${error.message}`);
    }
  }
}
