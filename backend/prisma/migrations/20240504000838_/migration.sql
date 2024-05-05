-- DropForeignKey
ALTER TABLE "PhysicalExam" DROP CONSTRAINT "PhysicalExam_appointmentID_fkey";

-- DropForeignKey
ALTER TABLE "PhysicalExam" DROP CONSTRAINT "PhysicalExam_queueID_fkey";

-- AlterTable
ALTER TABLE "PhysicalExam" ALTER COLUMN "appointmentID" DROP NOT NULL,
ALTER COLUMN "queueID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PhysicalExam" ADD CONSTRAINT "PhysicalExam_queueID_fkey" FOREIGN KEY ("queueID") REFERENCES "Queue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExam" ADD CONSTRAINT "PhysicalExam_appointmentID_fkey" FOREIGN KEY ("appointmentID") REFERENCES "Appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
