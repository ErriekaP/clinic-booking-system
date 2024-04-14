// DTOs
export class CreateAfterAppointmentDto {
  appointmentID: number;
  diagnosis: string;
  medications: CreateMedicineDto[];
}

export class CreateMedicineDto {
  medicineName: string;
  medicineStrength: string;
  medicineQuantity: string;
  medicineFrequency: string;
  remarks: string;
}
