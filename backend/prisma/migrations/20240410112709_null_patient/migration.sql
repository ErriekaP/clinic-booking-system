-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_patientID_fkey";

-- AlterTable
ALTER TABLE "Appointments" ALTER COLUMN "patientID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
