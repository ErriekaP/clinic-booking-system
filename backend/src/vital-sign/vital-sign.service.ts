import { Injectable } from '@nestjs/common';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { UpdateVitalSignDto } from './dto/update-vital-sign.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VitalSignService {
  constructor(private readonly prisma: PrismaService) {}

  async findBasedOnQueueId(id: number) {
    const vitalSign = await this.prisma.vitalSign.findFirst({
      where: {
        afterQueue: {
          is: {
            queueID: id,
          },
        },
      },
    });
    return vitalSign;
  }
  create(createVitalSignDto: CreateVitalSignDto) {
    return 'This action adds a new vitalSign';
  }

  findAll() {
    return `This action returns all vitalSign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vitalSign`;
  }

  update(id: number, updateVitalSignDto: UpdateVitalSignDto) {
    return `This action updates a #${id} vitalSign`;
  }

  remove(id: number) {
    return `This action removes a #${id} vitalSign`;
  }
}
