/*
  Warnings:

  - You are about to drop the column `afterAppointmentID` on the `vitalSign` table. All the data in the column will be lost.
  - You are about to drop the column `afterQueueID` on the `vitalSign` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[queueID]` on the table `vitalSign` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentID]` on the table `vitalSign` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "vitalSign" DROP CONSTRAINT "vitalSign_afterAppointmentID_fkey";

-- DropForeignKey
ALTER TABLE "vitalSign" DROP CONSTRAINT "vitalSign_afterQueueID_fkey";

-- DropIndex
DROP INDEX "vitalSign_afterAppointmentID_key";

-- DropIndex
DROP INDEX "vitalSign_afterQueueID_key";

-- AlterTable
ALTER TABLE "vitalSign" DROP COLUMN "afterAppointmentID",
DROP COLUMN "afterQueueID",
ADD COLUMN     "appointmentID" INTEGER,
ADD COLUMN     "queueID" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "vitalSign_queueID_key" ON "vitalSign"("queueID");

-- CreateIndex
CREATE UNIQUE INDEX "vitalSign_appointmentID_key" ON "vitalSign"("appointmentID");

-- AddForeignKey
ALTER TABLE "vitalSign" ADD CONSTRAINT "vitalSign_queueID_fkey" FOREIGN KEY ("queueID") REFERENCES "Queue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vitalSign" ADD CONSTRAINT "vitalSign_appointmentID_fkey" FOREIGN KEY ("appointmentID") REFERENCES "Appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
