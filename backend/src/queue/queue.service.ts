// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Queue, PrismaClient } from '@prisma/client';
import { SupabaseService } from 'supabase/supabase.service';
import { QueueDto } from './queue.dto';
import { error } from 'console';
import { ok } from 'assert';

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
      const queues = await this.prisma.queue.findMany({
        orderBy: {
          createdAt: 'desc', // Order by createdAt field in descending order
        },
      });
      // Map each queue to its associated service and patient
      const queuesWithDetails = await Promise.all(
        queues.map(async (queue) => {
          const service = await this.prisma.service.findUnique({
            where: {
              id: queue.serviceID,
            },
          });

          const patient = await this.prisma.patient.findUnique({
            where: {
              id: queue.patientID,
            },
          });
          console.log(service);
          console.log(patient);

          return {
            ...queue,
            service,
            patient,
          };
        }),
      );

      return queuesWithDetails;
    } catch (error) {
      console.error(
        `Unable to fetch queues with student and service information: ${error.message}`,
      );
      throw error;
    }
  }

  async getAllOngoingQueues(serviceId: number) {
    try {
      const service = await this.prisma.queue.findMany({
        where: {
          serviceID: serviceId,
          status: {
            in: ['ONGOING'],
          },
        },
      });
      console.log(service);
      return service;
    } catch (error) {
      throw new Error(`Unable to fetch queue: ${error.message}`);
    }
  }

  async getAllOngoingQueuesPersonnel(personnelId: number) {
    try {
      const personnel = await this.prisma.clinicPersonnel.findUnique({
        where: {
          id: personnelId,
        },
        include: {
          services: true,
        },
      });

      if (!personnel) {
        throw new Error(`Personnel with ID ${personnelId} not found.`);
      }

      const serviceIds = personnel.services.map((service) => service.id);
      const { firstName, lastName } = personnel;

      const ongoingQueues = await this.prisma.queue.findMany({
        where: {
          serviceID: {
            in: serviceIds,
          },
          status: 'ONGOING',
        },
        include: {
          patient: true,
        },
      });

      const ongoingQueuesWithDetails = await Promise.all(
        ongoingQueues.map(async (queue) => {
          const service = await this.prisma.service.findUnique({
            where: {
              id: queue.serviceID,
            },
          });

          return {
            id: queue.id,
            queueID: queue.queueID,
            queueCount: queue.queueCount,
            patientID: queue.patientID,
            status: queue.status,
            createdAt: queue.createdAt,
            updatedAt: queue.updatedAt,
            personnel: `${firstName} ${lastName}`,
            service: service ? service.serviceName : 'Service not found', //
            patient: {
              firstName: queue.patient.firstName,
              lastName: queue.patient.lastName,
            },
          };
        }),
      );

      console.log(ongoingQueuesWithDetails);
      return ongoingQueuesWithDetails;
    } catch (error) {
      throw new Error(`Unable to fetch ongoing queues: ${error.message}`);
    }
  }

  async getAllQueuesPersonnel(personnelId: number) {
    try {
      const personnel = await this.prisma.clinicPersonnel.findUnique({
        where: {
          id: personnelId,
        },
        include: {
          services: true,
        },
      });

      if (!personnel) {
        throw new Error(`Personnel with ID ${personnelId} not found.`);
      }

      const serviceIds = personnel.services.map((service) => service.id);
      const { firstName, lastName } = personnel;

      const ongoingQueues = await this.prisma.queue.findMany({
        where: {
          serviceID: {
            in: serviceIds,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          patient: true,
        },
      });

      const ongoingQueuesWithDetails = await Promise.all(
        ongoingQueues.map(async (queue) => {
          const service = await this.prisma.service.findUnique({
            where: {
              id: queue.serviceID,
            },
          });

          return {
            id: queue.id,
            queueID: queue.queueID,
            queueCount: queue.queueCount,
            patientID: queue.patientID,
            status: queue.status,
            createdAt: queue.createdAt,
            updatedAt: queue.updatedAt,
            personnel: `${firstName} ${lastName}`,
            service: service ? service.serviceName : 'Service not found', //
            patient: {
              firstName: queue.patient.firstName,
              lastName: queue.patient.lastName,
            },
          };
        }),
      );

      console.log(ongoingQueuesWithDetails);
      return ongoingQueuesWithDetails;
    } catch (error) {
      throw new Error(`Unable to fetch ongoing queues: ${error.message}`);
    }
  }

  async findPatientQueue(id: string) {
    const parsedId = parseInt(id, 10);
    const queues = await this.prisma.queue.findMany({
      where: {
        patientID: parsedId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Map each queue to its associated service and patient
    const queuesWithDetails = await Promise.all(
      queues.map(async (queue) => {
        const service = await this.prisma.service.findUnique({
          where: {
            id: queue.serviceID,
          },
        });

        const patient = await this.prisma.patient.findUnique({
          where: {
            id: queue.patientID,
          },
        });
        console.log(service);
        console.log(patient);

        return {
          ...queue,
          service,
          patient,
        };
      }),
    );
    return queuesWithDetails;
  }

  async finishQueue(id: string) {
    try {
      const parsedId = parseInt(id, 10);

      // Update the status  to "COMPLETED"
      const updatedQueue = await this.prisma.queue.update({
        where: { id: parsedId },
        data: { status: 'COMPLETED' },
      });
      return {
        success: true,
        data: { updatedQueue },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  //findqueue from queue number
  async processNextQueue(id: string) {
    try {
      const parsedId = parseInt(id, 10);

      const servicePause = await this.prisma.service.findFirst({
        where: {
          id: parsedId,
          isPause: false,
        },
      });

      // Find the first pending queue for the service
      const firstPendingQueue = await this.prisma.queue.findFirst({
        where: {
          serviceID: parsedId,
          status: 'PENDING',
        },
        orderBy: {
          id: 'asc', // Assuming queueCount determines the order of queues
        },
      });

      if (!firstPendingQueue) {
        throw new Error(`No pending queues found for service with ID ${id}.`);
      }

      if (servicePause != null) {
        // Update the status of the first pending queue to "ONGOING"
        const updatedFirstPendingQueue = await this.prisma.queue.update({
          where: { id: firstPendingQueue.id },
          data: { status: 'ONGOING' },
        });

        // Update the currentQueueNumber of the service to the queueCount of the updated pending queue
        const updatedService = await this.prisma.service.update({
          where: { id: parsedId },
          data: { currentQueueNumber: firstPendingQueue.id },
        });

        return {
          success: true,
          data: { updatedService, updatedFirstPendingQueue },
        };
      } else {
        return {
          success: false,
        };
      }
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

  async getQueuewithCurrentNumber(currentQueue: number) {
    try {
      const queue = await this.prisma.queue.findUnique({
        where: { id: currentQueue },
      });

      if (!queue) {
        throw new Error('Queue not found');
      }

      return queue;
    } catch (error) {
      console.log(`Unable to fetch queue with current queue: ${error.message}`);
    }
  }

  async getPatientQueue(patientID: number) {
    try {
      const queue = await this.prisma.queue.findMany({
        where: {
          patientID: patientID,
          status: {
            in: ['PENDING'],
          },
        },
      });

      if (!queue) {
        throw new Error('Queue not found');
      }

      return queue;
    } catch (error) {
      console.log(`Unable to fetch queue with current queue: ${error.message}`);
    }
  }

  async getQueueswithService() {
    try {
      const queue = await this.prisma.queue.findMany({
        where: { status: { in: ['ONGOING'] } },
      });

      if (!queue) {
        throw new Error('Queue not found');
      }

      return queue;
    } catch (error) {
      console.log(`Unable to fetch queue with current queue: ${error.message}`);
    }
  }

  async getMedication(afterQueueID: number) {
    try {
      const medication = await this.prisma.medicine.findFirst({
        where: { afterQueueID: afterQueueID },
      });

      if (!medication) {
        throw new Error('medication not found');
      }

      return medication;
    } catch (error) {
      console.log(`Unable to fetch queue with current queue: ${error.message}`);
    }
  }
  async getAfterQueue(patientID: number) {
    try {
      const queues = await this.prisma.queue.findMany({
        where: {
          patientID: patientID,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Map each queue
      const queuesWithDetails = await Promise.all(
        queues.map(async (queue) => {
          const afterQueue = await this.prisma.afterQueue.findUnique({
            where: { queueID: queue.id },
          });

          let medication = null; // Declare medication variable outside the if block

          if (afterQueue !== null) {
            medication = await this.prisma.medicine.findFirst({
              where: { afterQueueID: afterQueue.id },
            });
          }

          const service = await this.prisma.service.findUnique({
            where: {
              id: queue.serviceID,
            },
          });

          const patient = await this.prisma.patient.findUnique({
            where: {
              id: queue.patientID,
            },
          });

          console.log(service);
          console.log(patient);
          console.log(medication);

          // Return or do something with the gathered details for each queue

          return {
            ...queue,
            afterQueue,
            medication,
            service,
            patient,
          };
        }),
      );

      return queuesWithDetails;
    } catch (error) {
      throw new Error(`Unable to fetch afterQueue: ${error.message}`);
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

  async cancelQueue(id: string) {
    try {
      const parsedId = parseInt(id, 10);

      const updatedQueue = await this.prisma.queue.update({
        where: { id: parsedId },
        data: { status: 'CANCELLED' },
      });
      return {
        success: true,
        data: { updatedQueue },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
