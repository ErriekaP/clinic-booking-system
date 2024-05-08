-- DropForeignKey
ALTER TABLE "AfterQueue" DROP CONSTRAINT "AfterQueue_queueID_fkey";

-- AlterTable
ALTER TABLE "AfterQueue" ALTER COLUMN "queueID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AfterQueue" ADD CONSTRAINT "AfterQueue_queueID_fkey" FOREIGN KEY ("queueID") REFERENCES "Queue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
