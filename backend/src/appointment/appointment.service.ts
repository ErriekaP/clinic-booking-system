import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus } from '@prisma/client';

//need startTime and endTime ng doctor, return list of startTime and endTime. (Array with startTime and endTime).
//kunin ang appointments with same day

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
      const appointments = await this.prisma.appointments.findMany({
        include: {
          personnel: true,
          service: true,
          patient: true,
        },
      });

      return appointments;
    } catch (error) {
      throw new Error(`Unable to fetch appointments: ${error.message}`);
    }
  }

  async getPendingAppointments() {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          status: {
            in: [
              'PENDING',
              'REQUESTTOCANCELBYSTUDENT',
              'REQUESTTOCANCELBYDOCTOR',
            ],
          },
        },
        include: {
          personnel: true,
          service: true,
          patient: true,
        },
      });

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
          reasonforCancellation:
            updatedData.reasonforCancellation ??
            existingAppointment.reasonforCancellation,
          status: updatedData.status ?? existingAppointment.status,
        },
      });
      return { success: true, data: updatedAppointment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async findAppointment(id: string) {
    try {
      const parsedId = parseInt(id, 10);
      const appointment = await this.prisma.appointments.findUnique({
        where: {
          id: parsedId,
        },
        include: {
          service: true,
          personnel: true,
          patient: true,
        },
      });

      return appointment;
    } catch (error) {
      throw new Error(`Error finding appointment: ${error.message}`);
    }
  }
  //tanggalin sa list of appointments yun na day if same ng start time.
  async findAppointmentsByDate(date: Date) {
    console.log(date);

    //const formattedDate = date.toISOString().slice(0, 10);
    //console.log(formattedDate);

    //console.log(date.toDateString().split('T')[0]);
    console.log(date.toString().split('T')[0] + 'T00:00:001Z');
    return this.prisma.appointments.findMany({
      where: {
        startTime: {
          gte: new Date(date.toString().split('T')[0] + 'T00:00:00.001Z'),
          lte: new Date(date.toString().split('T')[0] + 'T23:59:59.000Z'),
        },
      },
    });
  }

  async createAppointment(data: {
    startTime: Date;
    endTime: Date;
    details: string;
    status: AppointmentStatus;
    reasonforCancellation: string;
    patientID?: number | null;
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
        patientID: data.patientID ?? null,
        personnelID: data.personnelID,
        serviceID: data.serviceID,
      },
    });
  }
}
