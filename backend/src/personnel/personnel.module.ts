import { Module } from '@nestjs/common';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [PersonnelController],
  providers: [PersonnelService, SupabaseService],
})
export class PersonnelModule {}
