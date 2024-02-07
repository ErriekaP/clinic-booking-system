import { HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from 'supabase/supabase.service';
import { LoginDto } from './auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response as Res } from 'express';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly supabaseService: SupabaseService,
  ) {}

  async signUp(dto: RegisterDto): Promise<any> {
  const { email, password, role, firstName, middleName,lastName,phoneNumber,dateofBirth, gender,status} = dto;
   // Sign up user in Supabase
  const supabaseUser = await this.supabaseService.signUp(email, password);
  console.log("this is the id:",supabaseUser.user.id)
  const UUID = supabaseUser.user.id


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
      dateofBirth,
      gender,
      status
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
    dateofBirth: Date;
    gender: string;
    status: string; 
  }): Promise<any> {
    return this.prisma.clinicPersonnel.create({
      data:{
        supabaseUserID: data.supabaseUserID,
        role: data.role as "ADMIN" | "DOCTOR"| "NURSE" ,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        dateofBirth: data.dateofBirth,
        gender: data.gender as "MALE" | "FEMALE" | "NON_BINARY" | "AGENDER" | "NON_BINARY"| "GENDERFLUID" | "BIGENDER" | "ANDROGYNOUS"| "PREFER_NOT_TO_SAY" | "OTHER",
        status: data.status as  "ACTIVE" | "INACTIVE",
      }
    });
  }

}
