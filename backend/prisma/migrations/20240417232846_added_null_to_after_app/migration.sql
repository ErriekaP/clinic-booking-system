-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_afterAppointmentID_fkey";

-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_afterQueueID_fkey";

-- AlterTable
ALTER TABLE "Medicine" ALTER COLUMN "afterAppointmentID" DROP NOT NULL,
ALTER COLUMN "afterQueueID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterQueueID_fkey" FOREIGN KEY ("afterQueueID") REFERENCES "AfterQueue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
