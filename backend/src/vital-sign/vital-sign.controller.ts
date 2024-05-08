import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VitalSignService } from './vital-sign.service';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { UpdateVitalSignDto } from './dto/update-vital-sign.dto';

@Controller('vital-sign')
export class VitalSignController {
  constructor(private readonly vitalSignService: VitalSignService) {}

  @Get('queueId/:id')
  async findBasedOnQueueId(@Param('id') id: number) {
    return await this.vitalSignService.findBasedOnQueueId(Number(id));
  }

  @Post()
  create(@Body() createVitalSignDto: CreateVitalSignDto) {
    return this.vitalSignService.create(createVitalSignDto);
  }

  @Get()
  findAll() {
    return this.vitalSignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vitalSignService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVitalSignDto: UpdateVitalSignDto,
  ) {
    return this.vitalSignService.update(+id, updateVitalSignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitalSignService.remove(+id);
  }
}
