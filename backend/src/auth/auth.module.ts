import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupabaseModule } from 'supabase/supabase.module';
import { AuthService } from './auth.service';
import { SupabaseService } from 'supabase/supabase.service'; // Adjust the import path
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SupabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SupabaseService],
})
export class AuthModule {}