// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Queue, PrismaClient } from '@prisma/client';
import { SupabaseService } from 'supabase/supabase.service';
import { QueueDto } from './queue.dto';

@Injectable()
export class QueueService {
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

  async addQueue(serviceData: any): Promise<any> {
    try {
      // Save in Supabase and in Prisma
      const prismaServiceData = {
        ...serviceData,
      };
      const newService = await this.createQueue(prismaServiceData);

      return { success: true, data: newService };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllQueues() {
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

  async findPatientQueue(id: string) {
    const parsedId = parseInt(id, 10);
    return this.prisma.queue.findMany({
      where: {
        patientID: parsedId,
      },
    });
  }
  //findqueue from queue number
  async processNextQueue(id: string) {
    try {
      const parsedId = parseInt(id, 10);

      // Find the current service
      const existingService = await this.prisma.service.findUnique({
        where: { id: parsedId },
      });

      if (!existingService) {
        throw new Error(`Service with ID ${id} not found.`);
      }

      // Find the first pending queue for the service
      const firstPendingQueue = await this.prisma.queue.findFirst({
        where: {
          serviceID: parsedId,
          status: 'PENDING',
        },
        orderBy: {
          queueCount: 'asc', // Assuming queueCount determines the order of queues
        },
      });

      if (!firstPendingQueue) {
        throw new Error(`No pending queues found for service with ID ${id}.`);
      }

      // Find the currently ongoing queue for the service
      const ongoingQueue = await this.prisma.queue.findFirst({
        where: {
          serviceID: parsedId,
          status: 'ONGOING',
        },
        orderBy: {
          queueCount: 'asc', // Assuming queueCount determines the order of queues
        },
      });

      // Update the status of the first pending queue to "ONGOING"
      const updatedFirstPendingQueue = await this.prisma.queue.update({
        where: { id: firstPendingQueue.id },
        data: { status: 'ONGOING' },
      });

      // If there's an ongoing queue, update its status to "COMPLETED"
      if (ongoingQueue) {
        await this.prisma.queue.update({
          where: { id: ongoingQueue.id },
          data: { status: 'COMPLETED' },
        });
      }

      // Update the currentQueueNumber of the service to the queueCount of the updated pending queue
      const updatedService = await this.prisma.service.update({
        where: { id: parsedId },
        data: { currentQueueNumber: firstPendingQueue.queueCount },
      });

      return {
        success: true,
        data: { updatedService, updatedFirstPendingQueue },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createQueue(dto: QueueDto): Promise<any> {
    const { patientID, serviceID, status } = dto;

    // Find the service associated with the provided serviceID
    const service = await this.prisma.service.findUnique({
      where: { id: serviceID },
    });

    if (!service) {
      throw new Error(`Service with ID ${serviceID} not found`);
    }
    // Check if the queueStatus of the service is "START"
    if (service.isStop == true) {
      throw new Error(`Cannot create queue. Service status is not "START".`);
    }
    // Extract the first 3 letters of the service name for queueID
    const serviceNamePrefix = service.serviceName.slice(0, 3).toUpperCase();

    // Find the total number of queues for the specified serviceID
    const queueCount = await this.prisma.queue.count({
      where: { serviceID },
    });

    // Calculate the next queueCount (1 to 100 cycle)
    const nextQueueCount = (queueCount % 100) + 1;

    // Generate the queueID combining service name prefix and nextQueueCount
    const queueID = `${serviceNamePrefix}-${nextQueueCount}`;

    return this.prisma.queue.create({
      data: {
        patientID: patientID,
        queueID: queueID,
        serviceID: serviceID,
        queueCount: nextQueueCount,
        status: 'PENDING',
      },
    });
  }

  async getServiceWithPersonnelAndSchedules(serviceId: number) {
    try {
      const service = await this.prisma.service.findUnique({
        where: { id: serviceId },
        include: {
          personnel: {
            include: {
              workSchedule: true,
            },
          },
        },
      });

      if (!service) {
        throw new Error('Service not found');
      }

      return service;
    } catch (error) {
      throw new Error(
        `Unable to fetch service with personnel and schedules: ${error.message}`,
      );
    }
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
