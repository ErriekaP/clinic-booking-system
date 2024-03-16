import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './register.dto';

@Injectable()
export class RegisterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async signUp(dto: RegisterDto): Promise<any> {
    const {
      email,
      password,
      role,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      specialty,
      status,
      services, // Array of service IDs
    } = dto;

    // Sign up user in Supabase
    const supabaseUser = await this.supabaseService.signUp(email, password);
    console.log('this is the id:', supabaseUser.user.id);
    const UUID = supabaseUser.user.id;

    // Create user in Prisma
    const prismaUser = await this.createClinicPersonnel({
      supabaseUserID: UUID,
      email,
      password,
      role,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      specialty,
      status,
      services, // Pass service IDs to the function
    });

    console.log(prismaUser);
    return { success: true, data: prismaUser };
  }

  async createClinicPersonnel(data: {
    supabaseUserID: string;
    role: 'ADMIN' | 'DOCTOR' | 'NURSE' | 'STAFF';
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender:
      | 'MALE'
      | 'FEMALE'
      | 'NON_BINARY'
      | 'AGENDER'
      | 'NON_BINARY'
      | 'GENDERFLUID'
      | 'BIGENDER'
      | 'ANDROGYNOUS'
      | 'PREFER_NOT_TO_SAY'
      | 'OTHER';
    specialty: string;
    status: 'ACTIVE' | 'INACTIVE';
    services: number[]; // Ensure serviceIds is an array of numbers
  }): Promise<any> {
    const { services, ...userData } = data;

    const createdPersonnel = await this.prisma.clinicPersonnel.create({
      data: {
        ...userData,
        services: {
          connect: services.map((serviceId) => ({ id: serviceId })),
        },
      },
    });

    return createdPersonnel;
  }
}
