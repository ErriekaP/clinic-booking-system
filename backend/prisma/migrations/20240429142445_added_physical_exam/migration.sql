-- CreateEnum
CREATE TYPE "LastMensPeriod" AS ENUM ('REGULAR', 'IRREGULAR');

-- CreateEnum
CREATE TYPE "PhysicalExamination" AS ENUM ('NORMAL', 'ABNORMAL');

-- CreateEnum
CREATE TYPE "GeneralSurvey" AS ENUM ('CONSCIOUS', 'COHERENT', 'AMBULATORY', 'NOTINDISTRESS');

-- CreateEnum
CREATE TYPE "ClinicAssess" AS ENUM ('PENDING', 'CLEARED');

-- CreateTable
CREATE TABLE "PhysicalExam" (
    "id" SERIAL NOT NULL,
    "purpose" TEXT NOT NULL,
    "genSurvey" "GeneralSurvey" NOT NULL,
    "bloodPressure" TEXT NOT NULL,
    "pulseRate" TEXT NOT NULL,
    "respRate" TEXT NOT NULL,
    "bodyTemp" TEXT NOT NULL,
    "LMP" "LastMensPeriod" NOT NULL,
    "hypertension" BOOLEAN NOT NULL,
    "bronchialAsthma" BOOLEAN NOT NULL,
    "heartDisease" BOOLEAN NOT NULL,
    "chestPain" BOOLEAN NOT NULL,
    "seizureDisorder" BOOLEAN NOT NULL,
    "others" TEXT NOT NULL,
    "LOC" TEXT NOT NULL,
    "injuries" TEXT NOT NULL,
    "skin" "PhysicalExamination" NOT NULL,
    "head" "PhysicalExamination" NOT NULL,
    "eyes" "PhysicalExamination" NOT NULL,
    "ears" "PhysicalExamination" NOT NULL,
    "neck" "PhysicalExamination" NOT NULL,
    "throat" "PhysicalExamination" NOT NULL,
    "chestAndLungs" "PhysicalExamination" NOT NULL,
    "heart" "PhysicalExamination" NOT NULL,
    "abdomen" "PhysicalExamination" NOT NULL,
    "gut" "PhysicalExamination" NOT NULL,
    "masculoSkeletal" "PhysicalExamination" NOT NULL,
    "neurological" "PhysicalExamination" NOT NULL,
    "CBC" "PhysicalExamination" NOT NULL,
    "urinalysis" "PhysicalExamination" NOT NULL,
    "fecalysis" "PhysicalExamination" NOT NULL,
    "chestXray" "PhysicalExamination" NOT NULL,
    "ECG" "PhysicalExamination" NOT NULL,
    "HBSAG" "PhysicalExamination" NOT NULL,
    "drugTest" "PhysicalExamination" NOT NULL,
    "isPhysicallyFit" BOOLEAN NOT NULL,
    "clinicAssessment" "ClinicAssess" NOT NULL,
    "forClearance" TEXT NOT NULL,
    "forLaboratory" TEXT NOT NULL,
    "forOthers" TEXT NOT NULL,
    "finalAssessment" TEXT NOT NULL,
    "afterAppointmentID" INTEGER NOT NULL,
    "afterQueueID" INTEGER NOT NULL,

    CONSTRAINT "PhysicalExam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalExam_afterAppointmentID_key" ON "PhysicalExam"("afterAppointmentID");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalExam_afterQueueID_key" ON "PhysicalExam"("afterQueueID");

-- AddForeignKey
ALTER TABLE "PhysicalExam" ADD CONSTRAINT "PhysicalExam_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExam" ADD CONSTRAINT "PhysicalExam_afterQueueID_fkey" FOREIGN KEY ("afterQueueID") REFERENCES "AfterQueue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
