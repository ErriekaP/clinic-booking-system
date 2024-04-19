/*
  Warnings:

  - Added the required column `afterQueueID` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "afterQueueID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AfterQueue" (
    "id" SERIAL NOT NULL,
    "queueID" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,

    CONSTRAINT "AfterQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AfterQueue_queueID_key" ON "AfterQueue"("queueID");

-- AddForeignKey
ALTER TABLE "AfterQueue" ADD CONSTRAINT "AfterQueue_queueID_fkey" FOREIGN KEY ("queueID") REFERENCES "Queue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterQueueID_fkey" FOREIGN KEY ("afterQueueID") REFERENCES "AfterQueue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
