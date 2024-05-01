/*
  Warnings:

  - Added the required column `CBC` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ECG` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HBSAG` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOC` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abdomen` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chestAndLungs` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chestXray` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinicAssessment` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugTest` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ears` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyes` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecalysis` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalAssessment` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forClearance` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forLaboratory` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forOthers` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gut` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `head` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heart` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `injuries` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPhysicallyFit` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masculoSkeletal` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neck` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neurological` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `others` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `throat` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urinalysis` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhysicalExam" ADD COLUMN     "CBC" TEXT NOT NULL,
ADD COLUMN     "ECG" TEXT NOT NULL,
ADD COLUMN     "HBSAG" TEXT NOT NULL,
ADD COLUMN     "LOC" TEXT NOT NULL,
ADD COLUMN     "abdomen" TEXT NOT NULL,
ADD COLUMN     "chestAndLungs" TEXT NOT NULL,
ADD COLUMN     "chestXray" TEXT NOT NULL,
ADD COLUMN     "clinicAssessment" "ClinicAssess" NOT NULL,
ADD COLUMN     "drugTest" TEXT NOT NULL,
ADD COLUMN     "ears" TEXT NOT NULL,
ADD COLUMN     "eyes" TEXT NOT NULL,
ADD COLUMN     "fecalysis" TEXT NOT NULL,
ADD COLUMN     "finalAssessment" TEXT NOT NULL,
ADD COLUMN     "forClearance" TEXT NOT NULL,
ADD COLUMN     "forLaboratory" TEXT NOT NULL,
ADD COLUMN     "forOthers" TEXT NOT NULL,
ADD COLUMN     "gut" TEXT NOT NULL,
ADD COLUMN     "head" TEXT NOT NULL,
ADD COLUMN     "heart" TEXT NOT NULL,
ADD COLUMN     "injuries" TEXT NOT NULL,
ADD COLUMN     "isPhysicallyFit" BOOLEAN NOT NULL,
ADD COLUMN     "masculoSkeletal" TEXT NOT NULL,
ADD COLUMN     "neck" TEXT NOT NULL,
ADD COLUMN     "neurological" TEXT NOT NULL,
ADD COLUMN     "others" TEXT NOT NULL,
ADD COLUMN     "skin" TEXT NOT NULL,
ADD COLUMN     "throat" TEXT NOT NULL,
ADD COLUMN     "urinalysis" TEXT NOT NULL;
