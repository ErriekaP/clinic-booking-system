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
      status,
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
      status,
    });
    return prismaUser;
  }

  async createClinicPersonnel(data: {
    supabaseUserID: string;
    role: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: string;
    status: string;
  }): Promise<any> {
    return this.prisma.clinicPersonnel.create({
      data: {
        supabaseUserID: data.supabaseUserID,
        role: data.role as 'ADMIN' | 'DOCTOR' | 'NURSE',
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender as
          | 'MALE'
          | 'FEMALE'
          | 'NON_BINARY'
          | 'AGENDER'
          | 'NON_BINARY'
          | 'GENDERFLUID'
          | 'BIGENDER'
          | 'ANDROGYNOUS'
          | 'PREFER_NOT_TO_SAY'
          | 'OTHER',
        status: data.status as 'ACTIVE' | 'INACTIVE',
      },
    });
  }
}
