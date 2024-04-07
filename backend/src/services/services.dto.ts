import { Status } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class ServiceDto {
  @IsString()
  serviceName: string;

  @IsString()
  description: string;

  @IsEnum(Status)
  status: Status;
}
