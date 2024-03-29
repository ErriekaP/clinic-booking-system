/*
  Warnings:

  - Added the required column `endTime` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AppointmentStatus" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
