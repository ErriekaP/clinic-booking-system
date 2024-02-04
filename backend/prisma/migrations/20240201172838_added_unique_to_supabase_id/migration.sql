/*
  Warnings:

  - A unique constraint covering the columns `[supabaseUserID]` on the table `ClinicPersonnel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClinicPersonnel_supabaseUserID_key" ON "ClinicPersonnel"("supabaseUserID");
