import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from 'supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    PrismaModule,
    SupabaseModule,
    AuthModule,
    PatientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}