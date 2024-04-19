// DTOs
export class CreateAfterQueueDto {
  queueID: number;
  diagnosis: string;
  medications: CreateMedicineDto[];
}

export class CreateMedicineDto {
  medicineName: string;
  medicineStrength: string;
  medicineQuantity: string;
  medicineFrequency: string;
  remarks: string;
  afterAppointmentID: null;
}
