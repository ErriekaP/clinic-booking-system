// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Service, PrismaClient } from '@prisma/client';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class ServicesService {
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
      const updatedPatient = await this.prisma.service.update({
        where: {
          id: id,
        },
        data: {
          // Update fields that are provided in updatedData
          serviceName: updatedData.serviceName ?? existingService.serviceName,
          description: updatedData.description ?? existingService.description,
        },
      });

      return { success: true, data: updatedPatient };
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
      const service = await this.prisma.service.findMany();
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

  async createService(data: {
    serviceName: string;
    description: string;
  }): Promise<any> {
    return this.prisma.service.create({
      data: {
        serviceName: data.serviceName,
        description: data.description,
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

  getHello(): string {
    return 'Hello World!';
  }
}
