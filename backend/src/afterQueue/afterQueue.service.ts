// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, AfterAppointment } from '@prisma/client';
import { SupabaseService } from 'supabase/supabase.service';
import { CreateAfterQueueDto } from './afterQueue.dto';
import { after } from 'node:test';

@Injectable()
export class afterQueueService {
  constructor(private readonly prisma: PrismaService) {}

  async updateService(id: number, updatedData: any): Promise<any> {
    try {
      // Retrieve the service record by ID
      const existingService = await this.prisma.service.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingService) {
        throw new Error(`Service with ID ${id} not found.`);
      }

      // Update the servicr record with the provided data
      const updatedService = await this.prisma.service.update({
        where: {
          id: id,
        },
        data: {
          // Update fields that are provided in updatedData
          serviceName: updatedData.serviceName ?? existingService.serviceName,
          description: updatedData.description ?? existingService.description,
          status: updatedData.status ?? existingService.status,
        },
      });

      return { success: true, data: updatedService };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllServices() {
    try {
      const service = await this.prisma.service.findMany({
        where: {
          status: {
            in: ['ACTIVE'],
          },
        },
      });
      console.log(service);
      console.log(this.prisma.$queryRaw`${service}`);
      return service;
    } catch (error) {
      throw new Error(`Unable to fetch patients: ${error.message}`);
    }
  }

  async findService(id: string) {
    const parsedId = parseInt(id, 10);
    return this.prisma.service.findUnique({
      where: {
        id: parsedId,
      },
    });
  }

  async createAfterQueue(createAfterAppointmentDto: CreateAfterQueueDto) {
    const { queueID, diagnosis, medications } = createAfterAppointmentDto;

    // Create AfterAppointment
    const afterQueue = await this.prisma.afterQueue.create({
      data: {
        queueID,
        diagnosis,
      },
    });

    // Create Medications for AfterAppointment
    const createMedicationsPromises = medications.map((medication) =>
      this.prisma.medicine.create({
        data: {
          afterQueueID: afterQueue.id,
          ...medication,
        },
      }),
    );

    await Promise.all(createMedicationsPromises);

    // // Update the status of the associated appointment to "COMPLETE"
    // await this.prisma.queue.update({
    //   where: {
    //     id: queueID,
    //   },
    //   data: {
    //     status: 'COMPLETED',
    //   },
    // });

    return afterQueue;
  }
  catch(error: any) {
    console.error('Error creating AfterAppointment:', error);
    throw error;
  }

  async countDoctorsByService(serviceId: number): Promise<number> {
    try {
      const doctorsCount = await this.prisma.clinicPersonnel.count({
        where: {
          services: {
            some: {
              id: serviceId,
            },
          },
        },
      });

      return doctorsCount;
    } catch (error) {
      throw new Error(`Unable to count doctors by service: ${error.message}`);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
