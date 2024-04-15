/*
  Warnings:

  - You are about to drop the column `registerTime` on the `Queue` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Queue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "registerTime",
DROP COLUMN "startTime";
