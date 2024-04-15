import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { SupabaseService } from 'supabase/supabase.service';

@Module({
  controllers: [QueueController],
  providers: [QueueService, SupabaseService],
})
export class QueueModule {}
