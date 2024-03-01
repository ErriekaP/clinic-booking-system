import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from 'supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { RegisterModule } from './register/register.module';
import { PersonnelModule } from './personnel/personnel.module';
@Module({
  imports: [
    PrismaModule,
    SupabaseModule,
    AuthModule,
    PatientModule,
    RegisterModule,
    PersonnelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
