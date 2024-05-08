import { Module } from '@nestjs/common';
import { VitalSignService } from './vital-sign.service';
import { VitalSignController } from './vital-sign.controller';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [VitalSignController],
  providers: [VitalSignService, SupabaseService],
})
export class VitalSignModule {}
