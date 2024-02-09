/*
  Warnings:

  - You are about to drop the column `dateofBirth` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClinicPersonnel" DROP COLUMN "dateofBirth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL;
