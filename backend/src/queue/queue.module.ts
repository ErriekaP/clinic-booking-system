import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { SupabaseService } from 'supabase/supabase.service';
import { EmailSenderModule } from 'src/emailSender/EmailSender.module';

@Module({
  imports: [EmailSenderModule],

  controllers: [QueueController],
  providers: [QueueService, SupabaseService],
})
export class QueueModule {}
