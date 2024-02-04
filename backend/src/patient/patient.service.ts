// patient.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async addPatient(patientData: any): Promise<any> {
    try {
      const newPatient = await this.prismaService.createPatient(patientData);
      return { success: true, data: newPatient };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
