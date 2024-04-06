// work-schedule.service.ts
import { Injectable } from '@nestjs/common';
import { WorkScheduleDto } from './schedule.dto';
import { Interval } from './schedule.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentService } from '../appointment/appointment.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class WorkScheduleService {
  constructor(
    private prisma: PrismaService,
    private readonly appointmentService: AppointmentService,
    private readonly serviceService: ServicesService,
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
    const intervalSet: Set<string> = new Set(); // Set to track unique intervals

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
            const startTimeStr = currentTime.toISOString().slice(11, 16);
            const endTimeStr = intervalEndTime.toISOString().slice(11, 16);
            const intervalKey = `${startTimeStr}-${endTimeStr}`;

            if (!intervalSet.has(intervalKey)) {
              // Check if interval is unique
              intervals.push({ startTime: startTimeStr, endTime: endTimeStr });
              intervalSet.add(intervalKey); // Add interval to the set
            }

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

      const filteredIntervals = intervals.filter(async (interval) => {
        // Filter appointments for the current interval's service ID
        const appointmentsForService = appointments.filter(
          (appointment) =>
            appointment.serviceID === serviceIds[0] && // Assuming serviceIds array has only one element
            new Date(appointment.endTime) > new Date(date), // Ensure appointment is for the specified date
        );

        // Check if any doctor for this service is still available during the interval
        const doctors = new Set(
          appointmentsForService.map((appointment) => appointment.id),
        );

        const totalDoctorsForService =
          await this.serviceService.countDoctorsByService(serviceIds[0]);

        // Keep the interval if there are still available doctors for this service
        return doctors.size < totalDoctorsForService;
      });

      console.log(filteredIntervals);

      return filteredIntervals;
    } catch (error) {
      throw new Error(
        `Failed to fetch appointments and remove intervals: ${error.message}`,
      );
    }
  }

  async findAvailablePersonnel(
    date: Date,
    interval: Interval,
    serviceId: number,
  ): Promise<any[]> {
    const { startTime, endTime } = interval;

    const dateString = date.toString().split('T')[0];
    const dateStartTimeString = `${dateString}T${startTime}:00.000Z`;
    const dateEndTimeString = `${dateString}T${endTime}:00.000Z`;

    // Fetch all appointments within the specified interval
    const appointments = await this.prisma.appointments.findMany({
      where: {
        startTime: dateStartTimeString,
        endTime: dateEndTimeString,
      },
      select: {
        personnelID: true,
      },
    });

    const bookedDoctorIds = appointments.map(
      (appointment) => appointment.personnelID,
    );

    // Fetch all personnel with their work schedules and services
    const personnelWithWorkSchedules =
      await this.prisma.clinicPersonnel.findMany({
        include: {
          workSchedule: true,
          services: true,
        },
      });

    // Filter out personnel based on availability and services
    const availablePersonnel = personnelWithWorkSchedules.filter((personnel) =>
      personnel.workSchedule.some((schedule) => {
        const scheduleStartTime = schedule.timeFrom.toISOString().slice(11, 23);
        const scheduleEndTime = schedule.timeTo.toISOString().slice(11, 23);

        const intervalStart = new Date(dateStartTimeString);
        const intervalEnd = new Date(dateEndTimeString);

        const intervalStartTime = intervalStart.toISOString().slice(11, 23);
        const intervalEndTime = intervalEnd.toISOString().slice(11, 23);

        const isIntervalWithinSchedule =
          scheduleStartTime <= intervalStartTime &&
          scheduleEndTime >= intervalEndTime;

        const hasRequiredService = serviceId;

        return isIntervalWithinSchedule && hasRequiredService;
      }),
    );
    console.log(availablePersonnel);

    // Filter available personnel to only include doctors and exclude those with booked appointments
    const availableDoctors = availablePersonnel.filter(
      (personnel) =>
        personnel.role === 'DOCTOR' && !bookedDoctorIds.includes(personnel.id),
    );

    return availableDoctors;
  }
}
