/*
  Warnings:

  - You are about to drop the column `patientID` on the `Appointments` table. All the data in the column will be lost.
  - Added the required column `patientSupabaseUserID` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_patientID_fkey";

-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "patientID",
ADD COLUMN     "patientSupabaseUserID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patientSupabaseUserID_fkey" FOREIGN KEY ("patientSupabaseUserID") REFERENCES "Patient"("supabaseUserID") ON DELETE RESTRICT ON UPDATE CASCADE;
