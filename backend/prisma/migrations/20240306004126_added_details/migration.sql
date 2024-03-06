/*
  Warnings:

  - Added the required column `details` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "details" TEXT NOT NULL;
