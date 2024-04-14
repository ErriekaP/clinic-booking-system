/*
  Warnings:

  - You are about to drop the `Medicine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `medicineFrequency` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineName` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineQuantity` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineStrength` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remarks` to the `AfterAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_afterAppointmentID_fkey";

-- AlterTable
ALTER TABLE "AfterAppointment" ADD COLUMN     "medicineFrequency" TEXT NOT NULL,
ADD COLUMN     "medicineName" TEXT NOT NULL,
ADD COLUMN     "medicineQuantity" TEXT NOT NULL,
ADD COLUMN     "medicineStrength" TEXT NOT NULL,
ADD COLUMN     "remarks" TEXT NOT NULL;

-- DropTable
DROP TABLE "Medicine";
