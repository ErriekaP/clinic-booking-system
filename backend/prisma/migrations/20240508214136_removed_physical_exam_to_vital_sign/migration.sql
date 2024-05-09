/*
  Warnings:

  - You are about to drop the column `physicalExamID` on the `vitalSign` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vitalSign" DROP CONSTRAINT "vitalSign_physicalExamID_fkey";

-- DropIndex
DROP INDEX "vitalSign_physicalExamID_key";

-- AlterTable
ALTER TABLE "vitalSign" DROP COLUMN "physicalExamID";
