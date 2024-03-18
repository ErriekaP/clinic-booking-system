// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Patient, PrismaClient } from '@prisma/client';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class PersonnelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async updatePersonnel(id: number, updatedData: any): Promise<any> {
    try {
      // Retrieve the personnel record by ID
      const existingPersonnel = await this.prisma.clinicPersonnel.findUnique({
        where: {
          id: id,
        },
        include: {
          services: true, // Include associated services
        },
      });

      if (!existingPersonnel) {
        throw new Error(`Personnel with ID ${id} not found.`);
      }

      // Extract the updated service IDs from updatedData
      const updatedServiceIds = updatedData.serviceIds ?? [];

      // Update the personnel record with the provided data
      const updatedPersonnel = await this.prisma.clinicPersonnel.update({
        where: {
          id: id,
        },
        data: {
          // Update fields that are provided in updatedData
          firstName: updatedData.firstName ?? existingPersonnel.firstName,
          middleName: updatedData.middleName ?? existingPersonnel.middleName,
          lastName: updatedData.lastName ?? existingPersonnel.lastName,
          email: updatedData.email ?? existingPersonnel.email,
          password: updatedData.password ?? existingPersonnel.password,
          role: updatedData.role ?? existingPersonnel.role,
          phoneNumber: updatedData.phoneNumber ?? existingPersonnel.phoneNumber,
          dateOfBirth: updatedData.dateOfBirth ?? existingPersonnel.dateOfBirth,
          gender: updatedData.gender ?? existingPersonnel.gender,
          specialty: updatedData.specialty ?? existingPersonnel.specialty,
          status: updatedData.status ?? existingPersonnel.status,
          // Update services to only include the provided IDs
          services: {
            set: updatedServiceIds.map((serviceId: number) => ({
              id: serviceId,
            })),
          },
        },
      });

      return { success: true, data: updatedPersonnel };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllPersonnel() {
    try {
      const personnel = await this.prisma.clinicPersonnel.findMany();
      console.log(personnel);
      console.log(this.prisma.$queryRaw`${personnel}`);
      return personnel;
    } catch (error) {
      throw new Error(`Unable to fetch patients: ${error.message}`);
    }
  }

  async getPersonnelWithServices(personnelId: string) {
    return this.prisma.clinicPersonnel.findUnique({
      where: { id: parseInt(personnelId) },
      include: { services: true },
    });
  }
}
