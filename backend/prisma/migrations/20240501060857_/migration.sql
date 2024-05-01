-- CreateEnum
CREATE TYPE "LastMensPeriod" AS ENUM ('REGULAR', 'IRREGULAR');

-- CreateEnum
CREATE TYPE "GeneralSurvey" AS ENUM ('CONSCIOUS', 'COHERENT', 'AMBULATORY', 'NOTINDISTRESS');

-- CreateEnum
CREATE TYPE "ClinicAssess" AS ENUM ('PENDING', 'CLEARED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DOCTOR', 'NURSE', 'STAFF');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('STUDENT', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'SCHEDULED', 'COMPLETE', 'REQUESTTOCANCELBYSTUDENT', 'REQUESTTOCANCELBYDOCTOR', 'CANCELLEDBYSTUDENT', 'CANCELLEDBYDOCTOR', 'DOCTORNOTAVAILABLE');

-- CreateEnum
CREATE TYPE "QueueStatus" AS ENUM ('PENDING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QueueController" AS ENUM ('START', 'STOP', 'NEXT', 'PAUSE', 'RESUME');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'AGENDER', 'GENDERFLUID', 'BIGENDER', 'ANDROGYNOUS', 'PREFER_NOT_TO_SAY', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('O', 'A', 'B', 'AB');

-- CreateTable
CREATE TABLE "ClinicPersonnel" (
    "id" SERIAL NOT NULL,
    "supabaseUserID" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "status" "Status" NOT NULL,
    "specialty" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicPersonnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSchedule" (
    "id" SERIAL NOT NULL,
    "timeFrom" TIMESTAMP(3) NOT NULL,
    "timeTo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "supabaseUserID" TEXT NOT NULL,
    "schoolID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "patientType" "Type" NOT NULL,
    "course" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "cluster" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "facultyDepartment" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "patientID" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "houseNo" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "subdivision" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" SERIAL NOT NULL,
    "patientID" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "healthInsuranceCompany" TEXT NOT NULL,
    "emergencyHospital" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyPhysician" (
    "id" SERIAL NOT NULL,
    "patientID" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FamilyPhysician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "id" SERIAL NOT NULL,
    "patientID" INTEGER NOT NULL,
    "famHistory" TEXT NOT NULL,
    "childhoodDiseases" TEXT NOT NULL,
    "medicalCondition" TEXT NOT NULL,
    "hospitalization" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "vaccines" TEXT NOT NULL,
    "psychosocialHistory" TEXT NOT NULL,
    "sexualHistory" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "isStop" BOOLEAN NOT NULL,
    "isPause" BOOLEAN NOT NULL,
    "currentQueueNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" SERIAL NOT NULL,
    "patientID" INTEGER,
    "personnelID" INTEGER,
    "serviceID" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "details" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL,
    "reasonforCancellation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhysicalExam" (
    "id" SERIAL NOT NULL,
    "afterQueueID" INTEGER,
    "afterAppointmentID" INTEGER,
    "purpose" TEXT NOT NULL,
    "genSurvey" "GeneralSurvey"[],
    "bloodPressure" TEXT NOT NULL,
    "pulseRate" TEXT NOT NULL,
    "respRate" TEXT NOT NULL,
    "bodyTemp" TEXT NOT NULL,
    "LMP" "LastMensPeriod" NOT NULL,
    "hypertension" BOOLEAN NOT NULL,
    "bronchialAsthma" BOOLEAN NOT NULL,
    "heartDisease" BOOLEAN NOT NULL,
    "chestPain" BOOLEAN NOT NULL,
    "seizureDisorder" BOOLEAN NOT NULL,

    CONSTRAINT "PhysicalExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AfterAppointment" (
    "id" SERIAL NOT NULL,
    "appointmentID" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,

    CONSTRAINT "AfterAppointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AfterQueue" (
    "id" SERIAL NOT NULL,
    "queueID" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,

    CONSTRAINT "AfterQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "afterAppointmentID" INTEGER,
    "afterQueueID" INTEGER,
    "medicineName" TEXT NOT NULL,
    "medicineStrength" TEXT NOT NULL,
    "medicineQuantity" TEXT NOT NULL,
    "medicineFrequency" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queue" (
    "id" SERIAL NOT NULL,
    "patientID" INTEGER NOT NULL,
    "queueID" TEXT NOT NULL,
    "serviceID" INTEGER NOT NULL,
    "queueCount" INTEGER NOT NULL,
    "status" "QueueStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClinicPersonnelServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClinicPersonnelWorkSchedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ClinicPersonnel_supabaseUserID_key" ON "ClinicPersonnel"("supabaseUserID");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicPersonnel_email_key" ON "ClinicPersonnel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_supabaseUserID_key" ON "Patient"("supabaseUserID");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_patientID_key" ON "Address"("patientID");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContact_patientID_key" ON "EmergencyContact"("patientID");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyPhysician_patientID_key" ON "FamilyPhysician"("patientID");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalHistory_patientID_key" ON "MedicalHistory"("patientID");

-- CreateIndex
CREATE UNIQUE INDEX "AfterAppointment_appointmentID_key" ON "AfterAppointment"("appointmentID");

-- CreateIndex
CREATE UNIQUE INDEX "AfterQueue_queueID_key" ON "AfterQueue"("queueID");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicPersonnelServices_AB_unique" ON "_ClinicPersonnelServices"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicPersonnelServices_B_index" ON "_ClinicPersonnelServices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicPersonnelWorkSchedule_AB_unique" ON "_ClinicPersonnelWorkSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicPersonnelWorkSchedule_B_index" ON "_ClinicPersonnelWorkSchedule"("B");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyPhysician" ADD CONSTRAINT "FamilyPhysician_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_personnelID_fkey" FOREIGN KEY ("personnelID") REFERENCES "ClinicPersonnel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_serviceID_fkey" FOREIGN KEY ("serviceID") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExam" ADD CONSTRAINT "PhysicalExam_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExam" ADD CONSTRAINT "PhysicalExam_afterQueueID_fkey" FOREIGN KEY ("afterQueueID") REFERENCES "AfterQueue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfterAppointment" ADD CONSTRAINT "AfterAppointment_appointmentID_fkey" FOREIGN KEY ("appointmentID") REFERENCES "Appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfterQueue" ADD CONSTRAINT "AfterQueue_queueID_fkey" FOREIGN KEY ("queueID") REFERENCES "Queue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterQueueID_fkey" FOREIGN KEY ("afterQueueID") REFERENCES "AfterQueue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicPersonnelServices" ADD CONSTRAINT "_ClinicPersonnelServices_A_fkey" FOREIGN KEY ("A") REFERENCES "ClinicPersonnel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicPersonnelServices" ADD CONSTRAINT "_ClinicPersonnelServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicPersonnelWorkSchedule" ADD CONSTRAINT "_ClinicPersonnelWorkSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "ClinicPersonnel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicPersonnelWorkSchedule" ADD CONSTRAINT "_ClinicPersonnelWorkSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
