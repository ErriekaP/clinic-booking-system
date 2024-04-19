import { Module } from '@nestjs/common';
import { afterQueueController } from './afterQueue.controller';
import { afterQueueService } from './afterQueue.service';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [afterQueueController],
  providers: [afterQueueService, SupabaseService],
})
export class AfterQueueModule {}
