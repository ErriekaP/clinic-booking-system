import { Gender, Status } from "@prisma/client";

export class LoginDto {
    supabaseUserId: string;
  }

  export class RegisterDto {
    supabaseUserID: string;
    role: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateofBirth: Date;  
    gender: string;
    status: string;
  }