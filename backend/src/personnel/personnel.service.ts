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
      // Retrieve the patient record by ID
      const existingPersonnel = await this.prisma.clinicPersonnel.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingPersonnel) {
        throw new Error(`Personnel with ID ${id} not found.`);
      }

      // Update the patient record with the provided data
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
          status: updatedData.status ?? existingPersonnel.status,
        },
      });

      return { success: true, data: updatedPersonnel };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  //   async addPersonnel(patientData: any): Promise<any> {
  //     try {
  //       // First, create user in Supabase
  //       const { email, password, role } = patientData;
  //       const { user, session, error } = await this.supabaseService.signUp(
  //         email,
  //         password,
  //       );

  //       if (error) {
  //         throw new Error('Error creating user in Supabase: ' + error.message);
  //       }

  //       // Save role and SupabaseID in Prisma
  //       const prismaPatientData = {
  //         ...patientData,
  //         supabaseUserID: user.id, // Supabase user ID is stored in 'id' field
  //       };
  //       const newPatient = await this.createPersonnel(prismaPatientData);

  //       return { success: true, data: newPatient };
  //     } catch (error) {
  //       return { success: false, error: error.message };
  //     }
  //   }

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

  async findPersonnel(id: string) {
    const parsedId = parseInt(id, 10);
    return this.prisma.clinicPersonnel.findUnique({
      where: {
        id: parsedId,
      },
    });
  }

  //   async createPersonnel(data: {
  //     schoolID: string;
  //     supabaseUserID: string;
  //     firstName: string;
  //     middleName: string;
  //     lastName: string;
  //     address?: {
  //       city: string;
  //       province: string;
  //       zipCode: string;
  //       houseNo: string;
  //       street: string;
  //       barangay: string;
  //       subdivision: string;
  //     };
  //     email: string;
  //     password: string;
  //     patientType: string;
  //     course: string;
  //     section: string;
  //     cluster: string;
  //     department: string;
  //     occupation: string;
  //     facultyDepartment: string;
  //     contactNumber: string;
  //     dateOfBirth: Date;
  //     gender: string;
  //     bloodType: string;
  //     emergencyContact?: {
  //       firstName: string;
  //       lastName: string;
  //       contactNumber: string;
  //       relation: string;
  //       healthInsuranceCompany: string;
  //       emergencyHospital: string;
  //     };
  //     familyPhysician?: {
  //       firstName: string;
  //       lastName: string;
  //       contactNumber: string;
  //     };
  //     medicalHistory?: {
  //       famHistory: string;
  //       childhoodDiseases: string;
  //       medicalCondition: string;
  //       hospitalization: string;
  //       medication: string;
  //       allergies: string;
  //       vaccines: string;
  //       psychosocialHistory: string;
  //       sexualHistory: string;
  //     };
  //     appointment: {
  //       patientID: number;
  //       personnelID: number;
  //       serviceID: number;
  //       appointmentSched: Date;
  //       status: string;
  //     }[];
  //     queues: {
  //       queueSched: Date;
  //       purpose: string;
  //       status: string;
  //       patientID: number;
  //     }[];
  //     status: string;
  //   }): Promise<any> {
  //     return this.prisma.patient.create({
  //       data: {
  //         schoolID: 'data.schoolID',
  //         supabaseUserID: data.supabaseUserID,
  //         firstName: 'data.firstName',
  //         middleName: 'data.middleName',
  //         lastName: 'data.lastName',
  //         address: 'data.address'
  //           ? {
  //               create: {
  //                 city: 'data.address.city',
  //                 province: 'data.address.province',
  //                 zipCode: 'data.address.zipCode',
  //                 houseNo: 'data.address.houseNo',
  //                 street: 'data.address.street',
  //                 barangay: 'data.address.barangay',
  //                 subdivision: 'data.address.subdivision',
  //               },
  //             }
  //           : undefined,
  //         email: data.email,
  //         password: data.password,
  //         patientType: data.patientType as 'STUDENT' | 'EMPLOYEE',
  //         course: 'data.course',
  //         section: 'data.section',
  //         cluster: 'data.cluster',
  //         department: 'data.department',
  //         occupation: 'data.occupation',
  //         facultyDepartment: 'data.facultyDepartment',
  //         contactNumber: ' data.contactNumber',
  //         dateOfBirth: '2022-02-02T12:34:56Z',
  //         gender: 'AGENDER',
  //         bloodType: 'AB',
  //         emergencyContact: 'data.emergencyContact'
  //           ? {
  //               create: {
  //                 firstName: 'data.emergencyContact.firstName',
  //                 lastName: 'data.emergencyContact.lastName',
  //                 contactNumber: 'data.emergencyContact.contactNumber',
  //                 relation: 'data.emergencyContact.relation',
  //                 healthInsuranceCompany:
  //                   'data.emergencyContact.healthInsuranceCompany',
  //                 emergencyHospital: 'data.emergencyContact.emergencyHospital',
  //               },
  //             }
  //           : undefined,
  //         familyPhysician: 'data.familyPhysician'
  //           ? {
  //               create: {
  //                 firstName: 'data.familyPhysician.firstName',
  //                 lastName: 'data.familyPhysician.lastName',
  //                 contactNumber: 'data.familyPhysician.contactNumber',
  //               },
  //             }
  //           : undefined,
  //         medicalHistory: 'data.medicalHistory'
  //           ? {
  //               create: {
  //                 famHistory: 'data.medicalHistory.famHistory',
  //                 childhoodDiseases: 'data.medicalHistory.childhoodDiseases',
  //                 medicalCondition: 'data.medicalHistory.medicalCondition',
  //                 hospitalization: 'data.medicalHistory.hospitalization',
  //                 medication: 'data.medicalHistory.medication',
  //                 allergies: 'data.medicalHistory.allergies',
  //                 vaccines: 'data.medicalHistory.vaccines',
  //                 psychosocialHistory: ' data.medicalHistory.psychosocialHistory',
  //                 sexualHistory: 'data.medicalHistory.sexualHistory',
  //               },
  //             }
  //           : undefined,
  //         appointment: {
  //           create: data.appointment?.map((appointment) => ({
  //             appointmentSched: appointment.appointmentSched,
  //             status: appointment.status as 'SCHEDULED' | 'CANCELLED',
  //             patient: {
  //               connect: {
  //                 id: appointment.patientID,
  //               },
  //             },
  //             personnel: {
  //               connect: {
  //                 id: appointment.personnelID,
  //               },
  //             },
  //             service: {
  //               connect: {
  //                 id: appointment.serviceID,
  //               },
  //             },
  //           })) as any,
  //         },
  //         queue: {
  //           create: data.queues?.map((queues) => ({
  //             purpose: queues.purpose,
  //             status: queues.status as 'JOINED' | 'CANCELLED',
  //             patient: {
  //               connect: {
  //                 id: queues.patientID,
  //               },
  //             },
  //           })) as any,
  //         },

  //         status: 'ACTIVE',
  //       },
  //     });
  //   }

  //   getHello(): string {
  //     return 'Hello World!';
  //   }
}
