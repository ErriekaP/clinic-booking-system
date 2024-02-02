/*
  Warnings:

  - You are about to drop the column `DateofBirth` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - You are about to drop the column `lasttName` on the `ClinicPersonnel` table. All the data in the column will be lost.
  - Added the required column `dateofBirth` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClinicPersonnel" DROP COLUMN "DateofBirth",
DROP COLUMN "lasttName",
ADD COLUMN     "dateofBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
