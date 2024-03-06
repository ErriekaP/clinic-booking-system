import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, SupabaseService],
})
export class ServicesModule {}
