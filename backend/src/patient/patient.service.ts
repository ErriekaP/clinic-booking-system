// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Patient, PrismaClient } from '@prisma/client';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma: PrismaService, 

    ) {}

  async addPatient(patientData: any): Promise<any> {
    try {
      const newPatient = await this.createPatient(patientData);
      return { success: true, data: newPatient };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllPatients() {
    try {
      const patients = await this.prisma.patient.findMany();
      console.log(patients)
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
    });
  }

  async createPatient(data: {
    schoolID: string;
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
    emergencyContact?:{
      firstName: string;
      lastName: string;
      contactNumber: string;
      relation: string;
      healthInsuranceCompany: string;
      emergencyHospital: string;
    };
    familyPhysician?:{
      firstName: string;
      lastName: string;
      contactNumber: string;
    };
    medicalHistory?:{
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
        schoolID: data.schoolID,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        address: data.address
          ? {
              create: {
                city: data.address.city,
                province: data.address.province,
                zipCode: data.address.zipCode,
                houseNo: data.address.houseNo,
                street: data.address.street,
                barangay: data.address.barangay,
                subdivision: data.address.subdivision,
              },
            }
          : undefined,
        patientType: data.patientType as "STUDENT" | "TEACHER" | "STAFF",
        course: data.course,
        section: data.section,
        cluster: data.cluster,
        department: data.department,
        occupation: data.occupation,
        facultyDepartment: data.facultyDepartment,
        contactNumber: data.contactNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender as "MALE" | "FEMALE" | "NON_BINARY" | "AGENDER" | "NON_BINARY"| "GENDERFLUID" | "BIGENDER" | "ANDROGYNOUS"| "PREFER_NOT_TO_SAY" | "OTHER",
        bloodType: data.bloodType as  "O" | "A" | "B" | "AB",
        emergencyContact: data.emergencyContact
            ?{
              create:{
                firstName: data.emergencyContact.firstName,
                lastName: data.emergencyContact.lastName,
                contactNumber: data.emergencyContact.contactNumber,
                relation: data.emergencyContact.relation,
                healthInsuranceCompany: data.emergencyContact.healthInsuranceCompany,
                emergencyHospital: data.emergencyContact.emergencyHospital,
              }
            }
          : undefined,
        familyPhysician: data.familyPhysician
          ?{
            create:{
              firstName: data.familyPhysician.firstName,
              lastName: data.familyPhysician.lastName,
              contactNumber: data.familyPhysician.contactNumber
            }
          }
        : undefined,
        medicalHistory: data.medicalHistory
        ?{
          create:{
            famHistory: data.medicalHistory.famHistory,
            childhoodDiseases: data.medicalHistory.childhoodDiseases,
            medicalCondition: data.medicalHistory.medicalCondition,
            hospitalization: data.medicalHistory.hospitalization,
            medication: data.medicalHistory.medication,
            allergies: data.medicalHistory.allergies,
            vaccines: data.medicalHistory.vaccines,
            psychosocialHistory: data.medicalHistory.psychosocialHistory,
            sexualHistory: data.medicalHistory.sexualHistory,

          }
        }
      : undefined,
      appointment: {
        create: data.appointment?.map((appointment) => ({
          appointmentSched: appointment.appointmentSched,
          status: appointment.status as "SCHEDULED" | "CANCELLED",
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
          status: queues.status as "JOINED" | "CANCELLED",
          patient: {
            connect: {
              id: queues.patientID,
            },
          },
        })) as any,
      },
   
   
        status: data.status as "ACTIVE" | "INACTIVE",
      },
    });
  }


  getHello(): string {
    return 'Hello World!';
  }
}
