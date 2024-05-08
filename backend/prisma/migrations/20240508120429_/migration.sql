/*
  Warnings:

  - You are about to drop the column `LMP` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `LOC` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `bloodPressure` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `bodyTemp` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `bronchialAsthma` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `chestPain` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosis` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `genSurvey` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `heartDisease` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `hypertension` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `injuries` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `menstruation` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `others` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `pulseRate` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `respRate` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `seizureDisorder` on the `AfterQueue` table. All the data in the column will be lost.
  - You are about to drop the column `LMP` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `LOC` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `bloodPressure` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `bodyTemp` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `bronchialAsthma` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `chestPain` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `genSurvey` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `heartDisease` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `hypertension` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `injuries` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `menstruation` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `others` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `pulseRate` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `respRate` on the `PhysicalExam` table. All the data in the column will be lost.
  - You are about to drop the column `seizureDisorder` on the `PhysicalExam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AfterQueue" DROP COLUMN "LMP",
DROP COLUMN "LOC",
DROP COLUMN "bloodPressure",
DROP COLUMN "bodyTemp",
DROP COLUMN "bronchialAsthma",
DROP COLUMN "chestPain",
DROP COLUMN "diagnosis",
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
ALTER TABLE "PhysicalExam" DROP COLUMN "LMP",
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

-- CreateTable
CREATE TABLE "vitalSign" (
    "id" SERIAL NOT NULL,
    "physicalExamID" INTEGER,
    "afterQueueID" INTEGER,
    "diagnosis" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "genSurvey" "GeneralSurvey"[],
    "bloodPressure" TEXT NOT NULL,
    "pulseRate" TEXT NOT NULL,
    "respRate" TEXT NOT NULL,
    "bodyTemp" TEXT NOT NULL,
    "menstruation" TIMESTAMP(3),
    "LMP" "LastMensPeriod" NOT NULL,
    "hypertension" TEXT NOT NULL,
    "bronchialAsthma" TEXT NOT NULL,
    "heartDisease" TEXT NOT NULL,
    "chestPain" TEXT NOT NULL,
    "seizureDisorder" TEXT NOT NULL,
    "LOC" TEXT NOT NULL,
    "injuries" TEXT NOT NULL,
    "others" TEXT NOT NULL,

    CONSTRAINT "vitalSign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vitalSign_physicalExamID_key" ON "vitalSign"("physicalExamID");

-- CreateIndex
CREATE UNIQUE INDEX "vitalSign_afterQueueID_key" ON "vitalSign"("afterQueueID");

-- AddForeignKey
ALTER TABLE "vitalSign" ADD CONSTRAINT "vitalSign_physicalExamID_fkey" FOREIGN KEY ("physicalExamID") REFERENCES "PhysicalExam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vitalSign" ADD CONSTRAINT "vitalSign_afterQueueID_fkey" FOREIGN KEY ("afterQueueID") REFERENCES "AfterQueue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
