/*
  Warnings:

  - Added the required column `injuries` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AfterAppointment" ADD COLUMN     "injuries" TEXT NOT NULL;
