/*
  Warnings:

  - Changed the type of `queueStatus` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "queueStatus",
ADD COLUMN     "queueStatus" "QueueController"  NOT NULL;



