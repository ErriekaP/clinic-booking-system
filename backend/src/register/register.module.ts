import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { SupabaseModule } from 'supabase/supabase.module';
import { RegisterService } from './register.service';
import { SupabaseService } from 'supabase/supabase.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SupabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [RegisterController],
  providers: [RegisterService, SupabaseService],
})
export class RegisterModule {}
