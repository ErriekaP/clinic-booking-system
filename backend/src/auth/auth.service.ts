import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    const personnel = await this.getUserPersonnel(email);

    if (personnel && personnel.password === password) {
      res.status(200).json({
        id: personnel.id,
        email: email,
        supabaseUserID: personnel.supabaseUserID,
        role: personnel.role,
      });
    }

    const patient = await this.getUserPatient(email);
    if (patient && patient.password === password) {
      res.status(200).json({
        id: patient.id,
        email: email,
        supabaseUserID: patient.supabaseUserID,
        patientType: patient.patientType,
      });
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async loginPatient(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    const patient = await this.getUserPatient(email);

    if (patient && patient.password === password) {
      res.status(200).json({
        email: email,
        supabaseUserID: patient.supabaseUserID,
        patientType: patient.patientType,
      });
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getUserPersonnel(email: string) {
    const personnel = await this.prismaService.clinicPersonnel.findUnique({
      where: {
        email: email,
      },
    });

    return personnel;
  }

  async getUserPatient(email: string) {
    const patient = await this.prismaService.patient.findUnique({
      where: {
        email: email,
      },
    });

    return patient;
  }
  async fetchUserInfo(supabaseUserID: string) {
    try {
      const patient = await this.prismaService.patient.findUnique({
        where: {
          supabaseUserID: supabaseUserID,
        },
        select: {
          id: true,
          email: true,
          patientType: true,
        },
      });

      if (patient) {
        return patient;
      }

      const personnel = await this.prismaService.clinicPersonnel.findUnique({
        where: {
          supabaseUserID: supabaseUserID,
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      if (personnel) {
        return personnel;
      }

      throw new Error('User not found');
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw new Error('Error fetching user information');
    }
  }
}
