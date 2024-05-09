/*
  Warnings:

  - You are about to drop the column `LMP` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `LOC` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `bloodPressure` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `bodyTemp` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `bronchialAsthma` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `chestPain` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `genSurvey` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `heartDisease` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `hypertension` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `injuries` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `menstruation` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `others` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `pulseRate` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `respRate` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `seizureDisorder` on the `AfterAppointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[afterAppointmentID]` on the table `vitalSign` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AfterAppointment" DROP COLUMN "LMP",
DROP COLUMN "LOC",
DROP COLUMN "bloodPressure",
DROP COLUMN "bodyTemp",
DROP COLUMN "bronchialAsthma",
DROP COLUMN "chestPain",
DROP COLUMN "genSurvey",
DROP COLUMN "heartDisease",
DROP COLUMN "hypertension",
DROP COLUMN "injuries",
DROP COLUMN "menstruation",
DROP COLUMN "others",
DROP COLUMN "pulseRate",
DROP COLUMN "purpose",
DROP COLUMN "respRate",
DROP COLUMN "seizureDisorder";

-- AlterTable
ALTER TABLE "vitalSign" ADD COLUMN     "afterAppointmentID" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "vitalSign_afterAppointmentID_key" ON "vitalSign"("afterAppointmentID");

-- AddForeignKey
ALTER TABLE "vitalSign" ADD CONSTRAINT "vitalSign_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
