export class CreateVitalSignDto {
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

export enum GeneralSurvey {
  CONSCIOUS = 'CONSCIOUS',
  COHERENT = 'COHERENT',
  AMBULATORY = 'AMBULATORY',
  NOTINDISTRESS = 'NOTINDISTRESS',
}
