/*
  Warnings:

  - Made the column `queueID` on table `AfterQueue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AfterQueue" DROP CONSTRAINT "AfterQueue_queueID_fkey";

-- AlterTable
ALTER TABLE "AfterQueue" ALTER COLUMN "queueID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "AfterQueue" ADD CONSTRAINT "AfterQueue_queueID_fkey" FOREIGN KEY ("queueID") REFERENCES "Queue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
