/*
  Warnings:

  - Made the column `endTime` on table `Appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointments" ALTER COLUMN "endTime" SET NOT NULL;
