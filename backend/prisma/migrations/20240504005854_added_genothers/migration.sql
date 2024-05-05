/*
  Warnings:

  - Added the required column `genOthers` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhysicalExam" ADD COLUMN     "genOthers" TEXT NOT NULL;
