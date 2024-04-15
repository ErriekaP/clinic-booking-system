-- CreateEnum
CREATE TYPE "QueueController" AS ENUM ('START', 'STOP', 'NEXT', 'PAUSE', 'RESUME');

-- AlterTable
ALTER TABLE "Queue" ALTER COLUMN "queueID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "queueStatus" TEXT NOT NULL DEFAULT 'START';
