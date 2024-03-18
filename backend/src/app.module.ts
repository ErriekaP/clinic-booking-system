import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from 'supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { RegisterModule } from './register/register.module';
import { PersonnelModule } from './personnel/personnel.module';
import { ServicesModule } from './services/services.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    PrismaModule,
    SupabaseModule,
    AuthModule,
    PatientModule,
    RegisterModule,
    PersonnelModule,
    ServicesModule,
    AppointmentModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
