import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { SupabaseService } from 'supabase/supabase.service';
import { EmailSenderModule } from 'src/emailSender/EmailSender.module';
import { MyGateway } from 'src/gateway/gateway';

@Module({
  imports: [EmailSenderModule],

  controllers: [QueueController],
  providers: [QueueService, SupabaseService, MyGateway],
})
export class QueueModule {}
