/*
  Warnings:

  - Added the required column `diagnosis` to the `AfterQueue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AfterQueue" ADD COLUMN     "diagnosis" TEXT NOT NULL;
