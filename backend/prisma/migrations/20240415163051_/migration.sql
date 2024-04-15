/*
  Warnings:

  - You are about to drop the column `queueStatus` on the `Service` table. All the data in the column will be lost.
  - Added the required column `currentQueueNumber` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPause` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isStop` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "queueStatus",
ADD COLUMN     "currentQueueNumber" INTEGER NOT NULL,
ADD COLUMN     "isPause" BOOLEAN NOT NULL,
ADD COLUMN     "isStop" BOOLEAN NOT NULL;
