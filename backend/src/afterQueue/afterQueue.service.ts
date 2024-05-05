// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAfterQueueDto, CreatePhysicalExamDto } from './afterQueue.dto';

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

    await Promise.all([...createMedicationsPromises]);

    return afterQueue;
  }
  catch(error: any) {
    console.error('Error creating AfterAppointment:', error);
    throw error;
  }

  async createPhysicalExam(
    createPhysicalExamDto: CreatePhysicalExamDto,
  ): Promise<any> {
    try {
      const { queueID, ...physicalExamData } = createPhysicalExamDto;
      // Assuming this.prisma is your Prisma client instance
      const physicalExamRecord = await this.prisma.physicalExam.create({
        data: {
          ...physicalExamData,
          queueID: queueID, // Connect the PhysicalExam with the Queue using queueID
        },
      });

      return physicalExamRecord;
    } catch (error) {
      console.error('Error creating Physical Exam:', error);
      throw error;
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

  async getPhysicalExam(patientID: number) {
    try {
      const queues = await this.prisma.queue.findMany({
        where: {
          patientID: patientID,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Map each queue to its associated service and patient
      const queuesWithDetails = await Promise.all(
        queues.map(async (queue) => {
          const physicalExam = await this.prisma.physicalExam.findUnique({
            where: { queueID: queue.id },
          });

          // Check if physicalExam exists and its queueID matches the current queue's ID
          if (physicalExam && physicalExam.queueID === queue.id) {
            // Return or do something with the gathered details for each queue
            return {
              ...queue,
              physicalExam,
            };
          } else {
            // PhysicalExam does not exist or queueID does not match, handle accordingly
            return {
              ...queue,
              physicalExam: null, // Or any other appropriate value
            };
          }
        }),
      );

      return queuesWithDetails;
    } catch (error) {
      throw new Error(`Unable to fetch afterQueue: ${error.message}`);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
