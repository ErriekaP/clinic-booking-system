/*
  Warnings:

  - You are about to drop the column `afterAppointmentID` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `afterQueueID` on the `PhysicalExam` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[queueID]` on the table `PhysicalExam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentID]` on the table `PhysicalExam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentID` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queueID` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PhysicalExam" DROP CONSTRAINT "PhysicalExam_afterAppointmentID_fkey";

-- DropForeignKey
ALTER TABLE "PhysicalExam" DROP CONSTRAINT "PhysicalExam_afterQueueID_fkey";

-- AlterTable
ALTER TABLE "PhysicalExam" DROP COLUMN "afterAppointmentID",
DROP COLUMN "afterQueueID",
ADD COLUMN     "appointmentID" INTEGER NOT NULL,
ADD COLUMN     "queueID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalExam_queueID_key" ON "PhysicalExam"("queueID");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalExam_appointmentID_key" ON "PhysicalExam"("appointmentID");

-- AddForeignKey
ALTER TABLE "PhysicalExam" ADD CONSTRAINT "PhysicalExam_queueID_fkey" FOREIGN KEY ("queueID") REFERENCES "Queue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExam" ADD CONSTRAINT "PhysicalExam_appointmentID_fkey" FOREIGN KEY ("appointmentID") REFERENCES "Appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
