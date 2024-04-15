/*
  Warnings:

  - Added the required column `queueCount` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "queueCount" INTEGER NOT NULL;
