/*
  Warnings:

  - Added the required column `DateofBirth` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lasttName` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ClinicPersonnel` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `ClinicPersonnel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ClinicPersonnel" ADD COLUMN     "DateofBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "lasttName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
