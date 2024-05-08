/*
  Warnings:

  - Added the required column `LMP` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodPressure` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyTemp` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bronchialAsthma` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chestPain` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heartDisease` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hypertension` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `others` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pulseRate` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purpose` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respRate` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seizureDisorder` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AfterAppointment" ADD COLUMN     "LMP" "LastMensPeriod" NOT NULL,
ADD COLUMN     "bloodPressure" TEXT NOT NULL,
ADD COLUMN     "bodyTemp" TEXT NOT NULL,
ADD COLUMN     "bronchialAsthma" TEXT NOT NULL,
ADD COLUMN     "chestPain" TEXT NOT NULL,
ADD COLUMN     "genSurvey" "GeneralSurvey"[],
ADD COLUMN     "heartDisease" TEXT NOT NULL,
ADD COLUMN     "hypertension" TEXT NOT NULL,
ADD COLUMN     "menstruation" TIMESTAMP(3),
ADD COLUMN     "others" TEXT NOT NULL,
ADD COLUMN     "pulseRate" TEXT NOT NULL,
ADD COLUMN     "purpose" TEXT NOT NULL,
ADD COLUMN     "respRate" TEXT NOT NULL,
ADD COLUMN     "seizureDisorder" TEXT NOT NULL;
