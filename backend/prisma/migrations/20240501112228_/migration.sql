/*
  Warnings:

  - Added the required column `menstruation` to the `PhysicalExam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhysicalExam" ADD COLUMN     "menstruation" TIMESTAMP(3) NOT NULL;
