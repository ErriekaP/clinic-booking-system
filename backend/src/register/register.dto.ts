// register.dto.ts

import {
  IsString,
  IsEmail,
  IsDateString,
  IsEnum,
  IsArray,
  IsNumber,
  ArrayMinSize,
} from 'class-validator';
import { Role, Gender, Status } from '../enums'; // Import the Role enum
import { WorkScheduleDto } from 'src/schedule/schedule.dto';

export class LoginDto {
  supabaseUserId: string;
}

export class RegisterDto {
  @IsString()
  supabaseUserID: string;

  @IsEnum(Role) // Use IsEnum validator to ensure the role is one of the enum values
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  specialty: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(Status)
  status: Status;

  @IsArray()
  @ArrayMinSize(1) // Ensure the array is not empty
  @IsNumber({}, { each: true }) // Validate each element of the array as a number
  services: number[];

  @IsArray()
  @ArrayMinSize(1) // Ensure the array is not empty
  @IsNumber({}, { each: true }) // Validate each element of the array as a number
  workSchedule: number[];
}
