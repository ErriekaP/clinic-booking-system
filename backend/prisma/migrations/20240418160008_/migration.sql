-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_personnelID_fkey";

-- AlterTable
ALTER TABLE "Appointments" ALTER COLUMN "personnelID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_personnelID_fkey" FOREIGN KEY ("personnelID") REFERENCES "ClinicPersonnel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
