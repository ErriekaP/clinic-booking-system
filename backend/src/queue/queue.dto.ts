import { QueueStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class QueueDto {
  @IsNumber()
  patientID: number;

  @IsString()
  queueID: string;

  @IsNumber()
  serviceID: number;

  @IsString()
  status: QueueStatus;
}
