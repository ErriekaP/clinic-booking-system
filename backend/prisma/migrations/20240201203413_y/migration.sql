/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ClinicPersonnel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClinicPersonnel" DROP COLUMN "contactNumber",
DROP COLUMN "dateOfBirth",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "status";
