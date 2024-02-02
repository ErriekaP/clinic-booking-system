/*
  Warnings:

  - A unique constraint covering the columns `[patientID]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_patientID_key" ON "Address"("patientID");
