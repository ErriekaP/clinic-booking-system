/*
  Warnings:

  - Added the required column `specialty` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClinicPersonnel" ADD COLUMN     "specialty" TEXT NOT NULL;
