import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async addAppointment(appointmentData: any): Promise<any> {
    try {
      const prismaAppointmentData = {
        ...appointmentData,
      };
      const newAppointment = await this.createAppointment(
        prismaAppointmentData,
      );

      return { success: true, data: { newAppointment } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllAppointments() {
    try {
      const appointment = await this.prisma.appointments.findMany();
      console.log(appointment);
      console.log(this.prisma.$queryRaw`${appointment}`);
      return appointment;
    } catch (error) {
      throw new Error(`Unable to fetch appointments: ${error.message}`);
    }
  }

  async getPatientAppointments(patientId: number) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          patientID: patientId,
          status: {
            in: ['SCHEDULED', 'COMPLETED'],
          },
        },
      });
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw new Error(`Unable to fetch appointments: ${error.message}`);
    }
  }

  async updateAppointment(id: string, updatedData: any): Promise<any> {
    const parsedId = parseInt(id, 10);
    try {
      const existingAppointment = await this.prisma.appointments.findUnique({
        where: {
          id: parsedId,
        },
      });

      if (!existingAppointment) {
        throw new Error(`Appointment with ID ${id} not found.`);
      }
      const updatedAppointment = await this.prisma.appointments.update({
        where: {
          id: parsedId,
        },
        data: {
          status: updatedData.status ?? existingAppointment.status,
        },
      });
      return { success: true, data: updatedAppointment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async findAppointment(id: number) {
    //const parsedId = parseInt(id,10);
    return this.prisma.appointments.findUnique({
      where: {
        id: id,
      },
    });
  }
  async createAppointment(data: {
    startTime: Date;
    endTime: Date;
    details: string;
    status: AppointmentStatus;
    reasonforCancellation: string;
    patientID: number;
    personnelID: number;
    serviceID: number;
  }): Promise<any> {
    return this.prisma.appointments.create({
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        details: data.details,
        status: data.status,
        reasonforCancellation: data.reasonforCancellation,
        patientID: data.patientID,
        personnelID: data.personnelID,
        serviceID: data.serviceID,
      },
    });
  }
}
