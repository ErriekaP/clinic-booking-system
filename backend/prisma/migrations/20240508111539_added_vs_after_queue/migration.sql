/*
  Warnings:

  - Added the required column `LMP` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOC` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodPressure` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyTemp` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bronchialAsthma` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chestPain` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heartDisease` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hypertension` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `injuries` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `others` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pulseRate` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purpose` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respRate` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seizureDisorder` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AfterQueue" DROP CONSTRAINT "AfterQueue_queueID_fkey";

-- AlterTable
ALTER TABLE "AfterQueue" ADD COLUMN     "LMP" "LastMensPeriod" NOT NULL,
ADD COLUMN     "LOC" TEXT NOT NULL,
ADD COLUMN     "bloodPressure" TEXT NOT NULL,
ADD COLUMN     "bodyTemp" TEXT NOT NULL,
ADD COLUMN     "bronchialAsthma" TEXT NOT NULL,
ADD COLUMN     "chestPain" TEXT NOT NULL,
ADD COLUMN     "genSurvey" "GeneralSurvey"[],
ADD COLUMN     "heartDisease" TEXT NOT NULL,
ADD COLUMN     "hypertension" TEXT NOT NULL,
ADD COLUMN     "injuries" TEXT NOT NULL,
ADD COLUMN     "menstruation" TIMESTAMP(3),
ADD COLUMN     "others" TEXT NOT NULL,
ADD COLUMN     "pulseRate" TEXT NOT NULL,
ADD COLUMN     "purpose" TEXT NOT NULL,
ADD COLUMN     "respRate" TEXT NOT NULL,
ADD COLUMN     "seizureDisorder" TEXT NOT NULL,
ALTER COLUMN "queueID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AfterQueue" ADD CONSTRAINT "AfterQueue_queueID_fkey" FOREIGN KEY ("queueID") REFERENCES "Queue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
