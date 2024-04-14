/*
  Warnings:

  - Made the column `afterAppointmentID` on table `Medicine` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_afterAppointmentID_fkey";

-- DropIndex
DROP INDEX "Medicine_afterAppointmentID_key";

-- AlterTable
ALTER TABLE "Medicine" ALTER COLUMN "afterAppointmentID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
