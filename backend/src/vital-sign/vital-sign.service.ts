import { Injectable } from '@nestjs/common';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { UpdateVitalSignDto } from './dto/update-vital-sign.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VitalSignService {
  constructor(private readonly prisma: PrismaService) {}

  // async findVitalSignsByQueueId(queueId) {
  //   // Find vital signs associated with the appointment's physical exam
  //   const physicalExam = await this.prisma.physicalExam.findFirst({
  //     where: {
  //       queueID: queueId,
  //     },
  //     include: {
  //       vitalSign: true,
  //     },
  //   });

  //   if (physicalExam && physicalExam.vitalSign) {
  //     // Return vital signs associated with the physical exam if available
  //     return physicalExam.vitalSign;
  //   }

  //   // Find vital signs associated with the appointment's afterAppointment
  //   const afterQueue = await this.prisma.afterQueue.findFirst({
  //     where: {
  //       queueID: queueId,
  //     },
  //     include: {
  //       vitalSign: true,
  //     },
  //   });

  //   if (afterQueue && afterQueue.vitalSign) {
  //     // Return vital signs associated with the afterAppointment if available
  //     return afterQueue.vitalSign;
  //   }

  //   // Handle case where no vital signs are found for the given appointment ID
  //   return null;
  // }

  // async findVitalSignsByAppointmentId(appointmentId) {
  //   // Find vital signs associated with the appointment's physical exam
  //   const physicalExam = await this.prisma.physicalExam.findFirst({
  //     where: {
  //       appointmentID: appointmentId,
  //     },
  //     include: {
  //       vitalSign: true,
  //     },
  //   });

  //   if (physicalExam && physicalExam.vitalSign) {
  //     // Return vital signs associated with the physical exam if available
  //     return physicalExam.vitalSign;
  //   }

  //   // Find vital signs associated with the appointment's afterAppointment
  //   const afterAppointment = await this.prisma.afterAppointment.findFirst({
  //     where: {
  //       appointmentID: appointmentId,
  //     },
  //     include: {
  //       vitalSign: true,
  //     },
  //   });

  //   if (afterAppointment && afterAppointment.vitalSign) {
  //     // Return vital signs associated with the afterAppointment if available
  //     return afterAppointment.vitalSign;
  //   }

  //   // Handle case where no vital signs are found for the given appointment ID
  //   return null;
  // }

  async createVitalSignBasedOnQueueId(
    queueId: number,
    createVitalSignDto: CreateVitalSignDto,
  ) {
    await this.prisma.vitalSign.create({
      data: {
        ...createVitalSignDto,
        queueID: queueId,
      },
    });
  }

  async createVitalSignBasedOnAppointmentId(
    appointmentId: number,
    createVitalSignDto: CreateVitalSignDto,
  ) {
    await this.prisma.vitalSign.create({
      data: {
        ...createVitalSignDto,
        appointmentID: appointmentId,
      },
    });
  }

  async findBasedOnQueueId(id: number) {
    const vitalSign = await this.prisma.vitalSign.findFirst({
      where: {
        queueID: id,
      },
    });
    return vitalSign;
  }

  async findBasedOnAppointmentId(id: number) {
    const vitalSign = await this.prisma.vitalSign.findFirst({
      where: {
        appointmentID: id,
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
