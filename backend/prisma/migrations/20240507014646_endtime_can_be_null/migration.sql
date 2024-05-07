-- AlterEnum
ALTER TYPE "AppointmentStatus" ADD VALUE 'EMERGENCY';

-- AlterTable
ALTER TABLE "Appointments" ALTER COLUMN "endTime" DROP NOT NULL;
