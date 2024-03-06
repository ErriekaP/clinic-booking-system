/*
  Warnings:

  - The values [CANCELLED] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `reasonforCancellation` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentStatus_new" AS ENUM ('SCHEDULED', 'CANCELLEDBYSTUDENT', 'CANCELLEDBYDOCTOR');
ALTER TABLE "Appointments" ALTER COLUMN "status" TYPE "AppointmentStatus_new" USING ("status"::text::"AppointmentStatus_new");
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "AppointmentStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "reasonforCancellation" TEXT NOT NULL;
