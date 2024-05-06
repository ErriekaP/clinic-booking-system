// patient.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { afterQueueService } from './afterQueue.service';
import { CreateAfterQueueDto, CreatePhysicalExamDto } from './afterQueue.dto';

@Controller('afterQueue')
export class afterQueueController {
  constructor(private readonly afterQueueService: afterQueueService) {}

  @Get('/physicalExam/:id')
  async getAfterQueue(@Param('id') queueID: string) {
    const parsedId = parseInt(queueID, 10);

    return this.afterQueueService.getPhysicalExam(parsedId);
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
