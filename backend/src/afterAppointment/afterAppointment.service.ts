// patient.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, AfterAppointment, Appointments } from '@prisma/client';
import { SupabaseService } from 'supabase/supabase.service';
import { CreateAfterAppointmentDto } from './afterAppointment.dto';
import { after } from 'node:test';

@Injectable()
export class afterAppointmentService {
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

  // Function to get afterAppointment ID by patientID
  async getAfterAppointmentId(patientId: number) {
    try {
      console.log(patientId);
      // Find the appointment with the given patientID
      const appointments = await this.prisma.appointments.findMany({
        where: { patientID: patientId },
        include: { afterAppointmentID: true, patient: true }, // Include the related afterAppointment
      });

      // Map appointments to extract afterAppointment IDs and filter out nulls
      const afterAppointmentIds = appointments
        .filter((appointment) => appointment.afterAppointmentID !== null) // Filter out appointments with no afterAppointmentID
        .map((appointment) => appointment.afterAppointmentID.id); // Map to get the afterAppointmentID

      const afterAppointments: AfterAppointment[] =
        await this.prisma.afterAppointment.findMany({
          where: {
            id: {
              in: afterAppointmentIds,
            },
          },
          include: {
            medications: true,
          },
        });

      console.log('AfterAppointments:', afterAppointments);
      console.log('AfterAppointmentsID:', afterAppointmentIds);
      return afterAppointments;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error retrieving afterAppointment ID:', error);
      throw error; // Optionally rethrow the error or handle as needed
    }
  }

  async createAfterAppointment(
    createAfterAppointmentDto: CreateAfterAppointmentDto,
  ) {
    const { appointmentID, diagnosis, medications } = createAfterAppointmentDto;

    // Create AfterAppointment
    const afterAppointment = await this.prisma.afterAppointment.create({
      data: {
        appointmentID,
        diagnosis,
      },
    });

    // Create Medications for AfterAppointment
    const createMedicationsPromises = medications.map((medication) =>
      this.prisma.medicine.create({
        data: {
          afterAppointmentID: afterAppointment.id,
          ...medication,
        },
      }),
    );

    await Promise.all(createMedicationsPromises);

    // Update the status of the associated appointment to "COMPLETE"
    await this.prisma.appointments.update({
      where: {
        id: appointmentID,
      },
      data: {
        status: 'COMPLETE',
      },
    });

    return afterAppointment;
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
