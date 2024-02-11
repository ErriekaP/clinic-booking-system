import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    const user = await this.getUserInfoByEmail(email);

    if (user && user.password === password) {
      res.status(200).json({
        username: email,
        supabaseUserID: user.supabaseUserID,
        role: user.role,
      });
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getUserInfoByEmail(email: string) {
    const user = await this.prismaService.clinicPersonnel.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
