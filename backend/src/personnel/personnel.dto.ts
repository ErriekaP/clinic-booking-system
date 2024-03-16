// create-clinic-personnel.dto.ts

import { IsString, IsEmail, IsDateString, IsEnum } from 'class-validator';
import { Role, Gender, Status } from '../enums'; // Adjust the path as per your project structure

export class CreateClinicPersonnelDto {
  @IsString()
  supabaseUserID: string;

  @IsEnum(Role)
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

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  specialty: string;

  @IsEnum(Status)
  status: Status;
}
