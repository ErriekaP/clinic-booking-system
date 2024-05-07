-- DropForeignKey
ALTER TABLE "AfterAppointment" DROP CONSTRAINT "AfterAppointment_appointmentID_fkey";

-- AlterTable
ALTER TABLE "AfterAppointment" ALTER COLUMN "appointmentID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AfterAppointment" ADD CONSTRAINT "AfterAppointment_appointmentID_fkey" FOREIGN KEY ("appointmentID") REFERENCES "Appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
