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
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async signUp(dto: RegisterDto): Promise<any> {
  const { email, password, role, firstName, middleName,lastName,phoneNumber,dateofBirth, gender,status} = dto;
   // Sign up user in Supabase
  const supabaseUser = await this.supabaseService.signUp(email, password);
  console.log("this is the id:",supabaseUser.user.id)
  const UUID = supabaseUser.user.id


   // Create user in Prisma
  const prismaUser = await this.prismaService.createClinicPersonnel({
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
}
