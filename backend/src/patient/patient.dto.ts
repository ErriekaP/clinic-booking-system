export class PatientRegisterDto {
  supabaseUserID: string;
  role: string;
  email: string;
  password: string;
}

export class PatientDTO {
  schoolID: string;
  supabaseUserID: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address?: {
    city: string;
    province: string;
    zipCode: string;
    houseNo: string;
    street: string;
    barangay: string;
    subdivision: string;
  };
  email: string;
  password: string;
  patientType: string;
  course: string;
  section: string;
  cluster: string;
  department: string;
  occupation: string;
  facultyDepartment: string;
  contactNumber: string;
  dateOfBirth: Date;
  gender: string;
  bloodType: string;
  emergencyContact?: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    relation: string;
    healthInsuranceCompany: string;
    emergencyHospital: string;
  };
  familyPhysician?: {
    firstName: string;
    lastName: string;
    contactNumber: string;
  };
  medicalHistory?: {
    famHistory: string;
    childhoodDiseases: string;
    medicalCondition: string;
    hospitalization: string;
    medication: string;
    allergies: string;
    vaccines: string;
    psychosocialHistory: string;
    sexualHistory: string;
  };
  appointment: {
    patientID: number;
    personnelID: number;
    serviceID: number;
    appointmentSched: Date;
    status: string;
  }[];
  queues: {
    queueSched: Date;
    purpose: string;
    status: string;
    patientID: number;
  }[];
  status: string;
}
