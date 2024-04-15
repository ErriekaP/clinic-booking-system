/*
  Warnings:

  - You are about to drop the column `purpose` on the `Queue` table. All the data in the column will be lost.
  - You are about to drop the column `queueSched` on the `Queue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[queueID]` on the table `Queue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `queueID` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registerTime` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceID` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Queue_patientID_key";

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "purpose",
DROP COLUMN "queueSched",
ADD COLUMN     "queueID" INTEGER NOT NULL,
ADD COLUMN     "registerTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "serviceID" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Queue_queueID_key" ON "Queue"("queueID");
