import { HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from 'supabase/supabase.service';
import { LoginDto } from './auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response as Res } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}
}
