/*
  Warnings:

  - You are about to drop the column `patientSupabaseUserID` on the `Appointments` table. All the data in the column will be lost.
  - Added the required column `patientID` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_patientSupabaseUserID_fkey";

-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "patientSupabaseUserID",
ADD COLUMN     "patientID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
