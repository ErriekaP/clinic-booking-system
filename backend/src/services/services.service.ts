// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceDto } from './services.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async processIsNotPause(id: string) {
    try {
      const parsedId = parseInt(id, 10);

      // Find the current service
      const existingService = await this.prisma.service.findUnique({
        where: { id: parsedId },
      });

      if (!existingService) {
        throw new Error(`Service with ID ${id} not found.`);
      }

      // pause queue if not
      const isPause = await this.prisma.service.findFirst({
        where: {
          id: parsedId,
          isPause: false,
        },
      });

      if (!isPause) {
        await this.prisma.service.update({
          where: { id: parsedId },
          data: { isPause: false },
        });
      }
      return {
        success: true,
        data: { isPause },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async processIsPause(id: string) {
    try {
      const parsedId = parseInt(id, 10);

      // Find the current service
      const existingService = await this.prisma.service.findUnique({
        where: { id: parsedId },
      });

      if (!existingService) {
        throw new Error(`Service with ID ${id} not found.`);
      }

      // pause queue if not
      const isPause = await this.prisma.service.findFirst({
        where: {
          id: parsedId,
          isPause: false,
        },
      });

      if (isPause) {
        await this.prisma.service.update({
          where: { id: parsedId },
          data: { isPause: true },
        });
      }

      return {
        success: true,
        data: { isPause },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

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

  async addService(serviceData: any): Promise<any> {
    try {
      // Save in Supabase and in Prisma
      const prismaServiceData = {
        ...serviceData,
      };
      const newService = await this.createService(prismaServiceData);

      return { success: true, data: newService };
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

  async createService(dto: ServiceDto): Promise<any> {
    const { serviceName, description, status } = dto;
    return this.prisma.service.create({
      data: {
        serviceName: serviceName,
        description: description,
        status: status,
        isStop: false,
        isPause: false,
        currentQueueNumber: 1,
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
