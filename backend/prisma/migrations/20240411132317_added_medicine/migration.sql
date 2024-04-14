/*
  Warnings:

  - You are about to drop the column `medicineFrequency` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `medicineName` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `medicineQuantity` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `medicineStrength` on the `AfterAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `AfterAppointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AfterAppointment" DROP COLUMN "medicineFrequency",
DROP COLUMN "medicineName",
DROP COLUMN "medicineQuantity",
DROP COLUMN "medicineStrength",
DROP COLUMN "remarks";

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "afterAppointmentID" INTEGER NOT NULL,
    "medicineName" TEXT NOT NULL,
    "medicineStrength" TEXT NOT NULL,
    "medicineQuantity" TEXT NOT NULL,
    "medicineFrequency" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_afterAppointmentID_key" ON "Medicine"("afterAppointmentID");

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
