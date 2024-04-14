-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_afterAppointmentID_fkey";

-- AlterTable
ALTER TABLE "Medicine" ALTER COLUMN "afterAppointmentID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
