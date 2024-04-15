import { Status } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ServiceDto {
  @IsString()
  serviceName: string;

  @IsString()
  description: string;

  @IsString()
  queueStatus: string;

  @IsEnum(Status)
  status: Status;

  @IsNumber()
  currentQueueNumber: number;
}
