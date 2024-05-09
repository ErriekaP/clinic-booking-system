// DTOs

export class CreateAfterQueueDto {
  queueID: number;
  appointmentID: null;
  diagnosis: string;
  medications: CreateMedicineDto[];
  vitalSign: VitalSignDTO;
}

export class UpdateAfterQueueCheckupDto {
  diagnosis: string;
  medications: CreateMedicineDto[];
}

export class VitalSignDTO {
  purpose: string;
  genSurvey: GeneralSurvey[];
  bloodPressure: string;
  pulseRate: string;
  respRate: string;
  bodyTemp: string;
  LMP: 'REGULAR' | 'IRREGULAR' | 'NOTAPPLICABLE';
  menstruation: Date | null;
  hypertension: string;
  bronchialAsthma: string;
  heartDisease: string;
  chestPain: string;
  seizureDisorder: string;
  others: string;
  LOC: string;
  injuries: string;
}

export class CreateMedicineDto {
  medicineName: string;
  medicineStrength: string;
  medicineQuantity: string;
  medicineFrequency: string;
  remarks: string;
}

export class CreatePhysicalExamDto {
  queueID: number;
  appointmentID: null;
  vitalSign: VitalSignDTO;
  skin: string;
  head: string;
  eyes: string;
  ears: string;
  neck: string;
  throat: string;
  chestAndLungs: string;
  heart: string;
  abdomen: string;
  gut: string;
  masculoSkeletal: string;
  neurological: string;
  CBC: string;
  urinalysis: string;
  fecalysis: string;
  chestXray: string;
  ECG: string;
  HBSAG: string;
  drugTest: string;
  isPhysicallyFit: boolean;
  clinicAssessment: 'PENDING' | 'CLEARED';
  forClearance: string;
  forLaboratory: string;
  forOthers: string;
  finalAssessment: string;
}

export enum GeneralSurvey {
  CONSCIOUS = 'CONSCIOUS',
  COHERENT = 'COHERENT',
  AMBULATORY = 'AMBULATORY',
  NOTINDISTRESS = 'NOTINDISTRESS',
}
