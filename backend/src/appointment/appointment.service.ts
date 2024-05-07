import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus } from '@prisma/client';
import { EmailSender } from 'src/emailSender/EmailSender';
import { PatientService } from 'src/patient/patient.service';
import { PersonnelService } from 'src/personnel/personnel.service';
import * as dayjs from 'dayjs';
@Injectable()
export class AppointmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailSender: EmailSender,
    private patientService: PatientService,
    private personnelService: PersonnelService,
  ) {}

  async cancelAppointment(id: string) {
    try {
      const parsedId = parseInt(id, 10);

      const updatedAppointment = await this.prisma.appointments.update({
        where: { id: parsedId },
        data: { status: 'CANCELLEDBYDOCTOR' },
      });
      return {
        success: true,
        data: { updatedAppointment },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

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
        where: {
          NOT: {
            patient: null, // Exclude appointments where patient is null
          },
        },
        orderBy: {
          startTime: 'desc', // Order by startTime in descending order
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

  async updateAppointment(id: number, updatedData: any): Promise<any> {
    try {
      // Retrieve the service record by ID
      const existingAppointment = await this.prisma.appointments.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingAppointment) {
        throw new Error(`Service with ID ${id} not found.`);
      }

      // Get patient information using patientID
      const patientInfo = await this.patientService.findPatient(
        existingAppointment.patientID.toString(),
      );

      if (!patientInfo) {
        throw new Error(
          `Patient with ID ${existingAppointment.patientID} not found.`,
        );
      }

      // Update the servicr record with the provided data
      const updatedService = await this.prisma.appointments.update({
        where: {
          id: id,
        },
        data: {
          // Update fields that are provided in updatedData
          personnelID:
            updatedData.personnelID ?? existingAppointment.personnelID,
          reasonforCancellation:
            updatedData.reasonforCancellation ??
            existingAppointment.reasonforCancellation,
          status: updatedData.status ?? existingAppointment.status,
        },
      });

      // Get personnel information using patientID
      const personnelInfo =
        await this.personnelService.getPersonnelWithServices(
          updatedData.personnelID.toString(),
        );
      // Get service information using patientID

      const serviceInfo = await this.prisma.service.findUnique({
        where: {
          id: updatedData.serviceID,
        },
      });

      const date = dayjs(existingAppointment.startTime).format('MMMM D, YYYY');
      const startTimeString = existingAppointment.startTime
        .toISOString()
        .slice(0, -1);
      const startTime = dayjs(startTimeString).format('hh:mm A');

      const endTimeString = existingAppointment.endTime
        .toISOString()
        .slice(0, -1);
      const endTime = dayjs(endTimeString).format('hh:mm A');

      if (updatedData.status === 'SCHEDULED') {
        this.emailSender.sendEmail({
          emailType: 'AppointmentConfirmation',
          toEmail: patientInfo.email,
          patientFirstName: patientInfo.firstName,
          patientMiddleName: patientInfo.middleName,
          patientLastName: patientInfo.lastName,
          date: date,
          startTime: startTime,
          endTime: endTime,
          personnelID: updatedService.personnelID,
          doctorFirstName: personnelInfo.firstName,
          doctorLastName: personnelInfo.lastName,
          serviceName: serviceInfo.serviceName,
          reasonforCancellation: updatedService.reasonforCancellation,
          status: updatedService.status,
        });
      }

      if (
        updatedData.status === 'CANCELLEDBYSTUDENT' ||
        updatedData.status === 'CANCELLEDBYDOCTOR'
      ) {
        this.emailSender.sendEmail({
          emailType: 'AppointmentCancellation',
          toEmail: patientInfo.email,
          patientFirstName: patientInfo.firstName,
          patientMiddleName: patientInfo.middleName,
          patientLastName: patientInfo.lastName,
          date: date,
          startTime: startTime,
          endTime: endTime,
          personnelID: updatedService.personnelID,
          doctorFirstName: personnelInfo.firstName,
          doctorLastName: personnelInfo.lastName,
          serviceName: serviceInfo.serviceName,
          reasonforCancellation: updatedService.reasonforCancellation,
          status: updatedService.status,
        });
      }

      return { success: true, data: updatedService };
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
  async getAfterAppointment(patientID: number) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          patientID: patientID,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Map each queue
      const appointmentWithDetails = await Promise.all(
        appointments.map(async (appointment) => {
          const afterAppointment =
            await this.prisma.afterAppointment.findUnique({
              where: { appointmentID: appointment.id },
            });

          let medication = null; // Declare medication variable outside the if block

          if (afterAppointment !== null) {
            medication = await this.prisma.medicine.findFirst({
              where: { afterAppointmentID: afterAppointment.id },
            });
          }

          const service = await this.prisma.service.findUnique({
            where: {
              id: appointment.serviceID,
            },
          });

          const patient = await this.prisma.patient.findUnique({
            where: {
              id: appointment.patientID,
            },
          });

          console.log(service);
          console.log(patient);
          console.log(medication);

          // Return or do something with the gathered details for each queue

          return {
            ...appointment,
            afterAppointment,
            medication,
            service,
            patient,
          };
        }),
      );

      return appointmentWithDetails;
    } catch (error) {
      throw new Error(`Unable to fetch afterQueue: ${error.message}`);
    }
  }
  async createAppointment(data: {
    startTime: Date;
    endTime: Date;
    details: string;
    status: AppointmentStatus;
    reasonforCancellation: string;
    patientID?: number | null;
    personnelID?: number | null;
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
