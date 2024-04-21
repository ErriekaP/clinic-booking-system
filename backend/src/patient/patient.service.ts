// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Patient, PrismaClient } from '@prisma/client';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async getPatientIdFromSupabaseId(supabaseId: string) {
    // Query your database to find the patient's ID using their Supabase ID
    const patient = await this.prisma.patient.findFirst({
      where: {
        supabaseUserID: supabaseId,
      },
      select: {
        id: true,
      },
    });
    if (patient != null) {
      return patient.id;
    } else return null;
  }

  async updatePatient(id: number, updatedData: any): Promise<any> {
    try {
      // Retrieve the patient record by ID
      const existingPatient = await this.prisma.patient.findUnique({
        where: {
          id: id,
        },
        include: {
          address: true,
          emergencyContact: true,
          familyPhysician: true,
          medicalHistory: true, // Include the address relation
        },
      });

      if (!existingPatient) {
        throw new Error(`Patient with ID ${id} not found.`);
      }

      // Update the patient record with the provided data
      const updatedPatient = await this.prisma.patient.update({
        where: {
          id: id,
        },
        data: {
          // Update fields that are provided in updatedData
          schoolID: updatedData.schoolID ?? existingPatient.schoolID,
          firstName: updatedData.firstName ?? existingPatient.firstName,
          middleName: updatedData.middleName ?? existingPatient.middleName,
          lastName: updatedData.lastName ?? existingPatient.lastName,
          email: updatedData.email ?? existingPatient.email,
          password: updatedData.password ?? existingPatient.password,
          address:
            updatedData.address !== undefined
              ? {
                  update: {
                    city:
                      updatedData.address?.city ??
                      existingPatient.address?.city,
                    province:
                      updatedData.address?.province ??
                      existingPatient.address?.province,
                    zipCode:
                      updatedData.address?.zipCode ??
                      existingPatient.address?.zipCode,
                    houseNo:
                      updatedData.address?.houseNo ??
                      existingPatient.address?.houseNo,
                    street:
                      updatedData.address?.street ??
                      existingPatient.address?.street,
                    barangay:
                      updatedData.address?.barangay ??
                      existingPatient.address?.barangay,
                    subdivision:
                      updatedData.address?.subdivision ??
                      existingPatient.address?.subdivision,
                  },
                }
              : undefined,
          patientType: updatedData.patientType ?? existingPatient.patientType,
          course: updatedData.course ?? existingPatient.course,
          section: updatedData.section ?? existingPatient.section,
          cluster: updatedData.cluster ?? existingPatient.cluster,
          department: updatedData.department ?? existingPatient.department,
          occupation: updatedData.occupation ?? existingPatient.occupation,
          facultyDepartment:
            updatedData.facultyDepartment ?? existingPatient.facultyDepartment,
          contactNumber:
            updatedData.contactNumber ?? existingPatient.contactNumber,
          dateOfBirth: updatedData.dateOfBirth ?? existingPatient.dateOfBirth,
          gender: updatedData.gender ?? existingPatient.gender,
          bloodType: updatedData.bloodType ?? existingPatient.bloodType,

          emergencyContact:
            updatedData.emergencyContact !== undefined
              ? {
                  update: {
                    firstName:
                      updatedData.emergencyContact?.firstName ??
                      existingPatient.emergencyContact?.firstName,
                    lastName:
                      updatedData.emergencyContact?.lastName ??
                      existingPatient.emergencyContact?.lastName,
                    contactNumber:
                      updatedData.emergencyContact?.contactNumber ??
                      existingPatient.emergencyContact?.contactNumber,
                    relation:
                      updatedData.emergencyContact?.relation ??
                      existingPatient.emergencyContact?.relation,
                    healthInsuranceCompany:
                      updatedData.emergencyContact?.healthInsuranceCompany ??
                      existingPatient.emergencyContact?.healthInsuranceCompany,
                    emergencyHospital:
                      updatedData.emergencyContact?.emergencyHospital ??
                      existingPatient.emergencyContact?.emergencyHospital,
                  },
                }
              : undefined,

          familyPhysician:
            updatedData.familyPhysician !== undefined
              ? {
                  update: {
                    firstName:
                      updatedData.familyPhysician?.firstName ??
                      existingPatient.familyPhysician?.firstName,
                    lastName:
                      updatedData.familyPhysician?.lastName ??
                      existingPatient.familyPhysician?.lastName,
                    contactNumber:
                      updatedData.familyPhysician?.contactNumber ??
                      existingPatient.familyPhysician?.contactNumber,
                  },
                }
              : undefined,

          medicalHistory:
            updatedData.medicalHistory !== undefined
              ? {
                  update: {
                    famHistory:
                      updatedData.medicalHistory?.famHistory ??
                      existingPatient.medicalHistory?.famHistory,
                    childhoodDiseases:
                      updatedData.medicalHistory?.childhoodDiseases ??
                      existingPatient.medicalHistory?.childhoodDiseases,
                    medicalCondition:
                      updatedData.medicalHistory?.medicalCondition ??
                      existingPatient.medicalHistory?.medicalCondition,
                    hospitalization:
                      updatedData.medicalHistory?.hospitalization ??
                      existingPatient.medicalHistory?.hospitalization,
                    medication:
                      updatedData.medicalHistory?.medication ??
                      existingPatient.medicalHistory?.medication,
                    allergies:
                      updatedData.medicalHistory?.allergies ??
                      existingPatient.medicalHistory?.allergies,
                    vaccines:
                      updatedData.medicalHistory?.vaccines ??
                      existingPatient.medicalHistory?.vaccines,
                    psychosocialHistory:
                      updatedData.medicalHistory?.psychosocialHistory ??
                      existingPatient.medicalHistory?.psychosocialHistory,
                    sexualHistory:
                      updatedData.medicalHistory?.sexualHistory ??
                      existingPatient.medicalHistory?.sexualHistory,
                  },
                }
              : undefined,
        },
      });

      return { success: true, data: updatedPatient };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addPatient(patientData: any): Promise<any> {
    try {
      // First, create user in Supabase
      const { email, password, role } = patientData;
      const { user, session, error } = await this.supabaseService.signUp(
        email,
        password,
      );

      if (error) {
        throw new Error('Error creating user in Supabase: ' + error.message);
      }

      // Save role and SupabaseID in Prisma
      const prismaPatientData = {
        ...patientData,
        supabaseUserID: user.id, // Supabase user ID is stored in 'id' field
      };
      const newPatient = await this.createPatient(prismaPatientData);

      return { success: true, data: newPatient };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllPatients() {
    try {
      const patients = await this.prisma.patient.findMany();
      console.log(patients);
      console.log(this.prisma.$queryRaw`${patients}`);
      return patients;
    } catch (error) {
      throw new Error(`Unable to fetch patients: ${error.message}`);
    }
  }

  async findPatient(id: string) {
    const parsedId = parseInt(id, 10);
    return this.prisma.patient.findUnique({
      where: {
        id: parsedId,
      },
      include: {
        address: true,
        emergencyContact: true,
        familyPhysician: true,
        medicalHistory: true,
        appointment: true,
        queue: true,
      },
    });
  }
  async getPatientAppointments(patientId: number) {
    console.log(patientId);
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          patientID: patientId,

          // status: {
          //   in: ['PENDING', 'SCHEDULED', 'COMPLETE'],
          // },
        },
        include: {
          service: true,
        },
      });
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw new Error(`Unable to fetch appointments: ${error.message}`);
    }
  }
  async createPatient(data: {
    schoolID: string;
    supabaseUserID: string;
    firstName: string;
    middleName: string;
    lastName: string;
    address?: {
      city: string;
      province: string;
      zipCode: string;
      houseNo: string;
      street: string;
      barangay: string;
      subdivision: string;
    };
    email: string;
    password: string;
    patientType: string;
    course: string;
    section: string;
    cluster: string;
    department: string;
    occupation: string;
    facultyDepartment: string;
    contactNumber: string;
    dateOfBirth: Date;
    gender: string;
    bloodType: string;
    emergencyContact?: {
      firstName: string;
      lastName: string;
      contactNumber: string;
      relation: string;
      healthInsuranceCompany: string;
      emergencyHospital: string;
    };
    familyPhysician?: {
      firstName: string;
      lastName: string;
      contactNumber: string;
    };
    medicalHistory?: {
      famHistory: string;
      childhoodDiseases: string;
      medicalCondition: string;
      hospitalization: string;
      medication: string;
      allergies: string;
      vaccines: string;
      psychosocialHistory: string;
      sexualHistory: string;
    };
    appointment: {
      patientID: number;
      personnelID: number;
      serviceID: number;
      appointmentSched: Date;
      status: string;
    }[];
    queues: {
      queueSched: Date;
      purpose: string;
      status: string;
      patientID: number;
    }[];
    status: string;
  }): Promise<any> {
    return this.prisma.patient.create({
      data: {
        schoolID: 'data.schoolID',
        supabaseUserID: data.supabaseUserID,
        firstName: 'data.firstName',
        middleName: 'data.middleName',
        lastName: 'data.lastName',
        address: 'data.address'
          ? {
              create: {
                city: 'data.address.city',
                province: 'data.address.province',
                zipCode: 'data.address.zipCode',
                houseNo: 'data.address.houseNo',
                street: 'data.address.street',
                barangay: 'data.address.barangay',
                subdivision: 'data.address.subdivision',
              },
            }
          : undefined,
        email: data.email,
        password: data.password,
        patientType: data.patientType as 'STUDENT' | 'EMPLOYEE',
        course: 'data.course',
        section: 'data.section',
        cluster: 'data.cluster',
        department: 'data.department',
        occupation: 'data.occupation',
        facultyDepartment: 'data.facultyDepartment',
        contactNumber: ' data.contactNumber',
        dateOfBirth: '2022-02-02T12:34:56Z',
        gender: 'AGENDER',
        bloodType: 'AB',
        emergencyContact: 'data.emergencyContact'
          ? {
              create: {
                firstName: 'data.emergencyContact.firstName',
                lastName: 'data.emergencyContact.lastName',
                contactNumber: 'data.emergencyContact.contactNumber',
                relation: 'data.emergencyContact.relation',
                healthInsuranceCompany:
                  'data.emergencyContact.healthInsuranceCompany',
                emergencyHospital: 'data.emergencyContact.emergencyHospital',
              },
            }
          : undefined,
        familyPhysician: 'data.familyPhysician'
          ? {
              create: {
                firstName: 'data.familyPhysician.firstName',
                lastName: 'data.familyPhysician.lastName',
                contactNumber: 'data.familyPhysician.contactNumber',
              },
            }
          : undefined,
        medicalHistory: 'data.medicalHistory'
          ? {
              create: {
                famHistory: 'data.medicalHistory.famHistory',
                childhoodDiseases: 'data.medicalHistory.childhoodDiseases',
                medicalCondition: 'data.medicalHistory.medicalCondition',
                hospitalization: 'data.medicalHistory.hospitalization',
                medication: 'data.medicalHistory.medication',
                allergies: 'data.medicalHistory.allergies',
                vaccines: 'data.medicalHistory.vaccines',
                psychosocialHistory: ' data.medicalHistory.psychosocialHistory',
                sexualHistory: 'data.medicalHistory.sexualHistory',
              },
            }
          : undefined,
        appointment: {
          create: data.appointment?.map((appointment) => ({
            appointmentSched: appointment.appointmentSched,
            status: appointment.status as 'SCHEDULED' | 'CANCELLED',
            patient: {
              connect: {
                id: appointment.patientID,
              },
            },
            personnel: {
              connect: {
                id: appointment.personnelID,
              },
            },
            service: {
              connect: {
                id: appointment.serviceID,
              },
            },
          })) as any,
        },
        queue: {
          create: data.queues?.map((queues) => ({
            purpose: queues.purpose,
            status: queues.status as 'JOINED' | 'CANCELLED',
            patient: {
              connect: {
                id: queues.patientID,
              },
            },
          })) as any,
        },

        status: 'ACTIVE',
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
