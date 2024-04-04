// work-schedule.service.ts
import { Injectable } from '@nestjs/common';
import { WorkScheduleDto } from './schedule.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ClinicPersonnel, WorkSchedule } from '@prisma/client';
import { AppointmentService } from '../appointment/appointment.service';

@Injectable()
export class WorkScheduleService {
  constructor(
    private prisma: PrismaService,
    private readonly appointmentService: AppointmentService,
  ) {}

  async createWorkSchedule(data: WorkScheduleDto): Promise<void> {
    await this.prisma.workSchedule.create({
      data: {
        timeFrom: data.timeFrom,
        timeTo: data.timeTo,
      },
    });
  }

  async generateTimeIntervalsForServices(
    serviceIds: number[],
  ): Promise<{ startTime: string; endTime: string }[]> {
    const intervals: { startTime: string; endTime: string }[] = [];

    for (const serviceId of serviceIds) {
      const personnel = await this.prisma.clinicPersonnel.findMany({
        where: {
          services: {
            some: {
              id: serviceId,
            },
          },
        },
        include: {
          workSchedule: true,
        },
      });

      for (const person of personnel) {
        for (const schedule of person.workSchedule) {
          let currentTime = new Date(schedule.timeFrom); // Start time of work schedule
          const endTimeObj = new Date(schedule.timeTo); // End time of work schedule

          while (currentTime < endTimeObj) {
            const intervalEndTime = new Date(
              currentTime.getTime() + 30 * 60000,
            ); // Add 30 minutes
            intervals.push({
              startTime: currentTime.toISOString().slice(11, 16),
              endTime: intervalEndTime.toISOString().slice(11, 16),
            });
            currentTime = intervalEndTime;
          }
        }
      }
    }

    return intervals;
  }

  async getAppointmentsAndRemoveIntervalsByDate(
    date: Date,
    serviceIds: number[],
  ): Promise<{ startTime: string; endTime: string }[]> {
    try {
      // Fetch appointments for the given date
      const appointments =
        await this.appointmentService.findAppointmentsByDate(date);

      // Generate time intervals for the given service IDs
      const intervals = await this.generateTimeIntervalsForServices(serviceIds);

      // Filter out intervals that fall within the time range of appointments
      const filteredIntervals = intervals.filter((interval) => {
        // Check if any appointment overlaps with the interval
        const overlappingAppointments = appointments.some((appointment) => {
          const appointmentStartTime = new Date(appointment.startTime);
          const appointmentEndTime = new Date(appointment.endTime);

          const dateString = date.toString().split('T')[0];
          const dateEndTimeString = `${dateString}T${interval.endTime}:00.000Z`;
          const dateStartTimeString = `${dateString}T${interval.startTime}:00.000Z`;
          const endTimeDay = new Date(dateEndTimeString);
          const startTimeDay = new Date(dateStartTimeString);

          console.log('appointmentStartTime', appointmentStartTime);
          console.log('endTimeDay', endTimeDay);
          console.log('appointmentEndTime', appointmentEndTime);
          console.log('startTimeDay', startTimeDay);

          console.log(appointment.serviceID);
          console.log(serviceIds[0]);

          return (
            appointment.serviceID === serviceIds[0] &&
            appointmentStartTime >= startTimeDay &&
            appointmentEndTime <= endTimeDay
          );
        });

        // Keep the interval if no appointments overlap with it
        return !overlappingAppointments;
      });

      console.log(filteredIntervals);

      return filteredIntervals;
    } catch (error) {
      throw new Error(
        `Failed to fetch appointments and remove intervals: ${error.message}`,
      );
    }
  }

  // generateTimeIntervals(
  //   startTime: string,
  //   endTime: string,
  // ): { startTime: string; endTime: string }[] {
  //   const intervals: { startTime: string; endTime: string }[] = [];
  //   let currentTime = new Date(startTime);
  //   const endTimeObj = new Date(endTime);

  //   while (currentTime < endTimeObj) {
  //     const intervalEndTime = new Date(currentTime.getTime() + 30 * 60000);
  //     intervals.push({
  //       startTime: currentTime.toISOString().slice(11, 16),
  //       endTime: intervalEndTime.toISOString().slice(11, 16),
  //     });
  //     currentTime = intervalEndTime;
  //   }

  //   return intervals;
  // }
}
