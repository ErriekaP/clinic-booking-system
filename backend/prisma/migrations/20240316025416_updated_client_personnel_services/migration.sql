-- CreateTable
CREATE TABLE "_ClinicPersonnelServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicPersonnelServices_AB_unique" ON "_ClinicPersonnelServices"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicPersonnelServices_B_index" ON "_ClinicPersonnelServices"("B");

-- AddForeignKey
ALTER TABLE "_ClinicPersonnelServices" ADD CONSTRAINT "_ClinicPersonnelServices_A_fkey" FOREIGN KEY ("A") REFERENCES "ClinicPersonnel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicPersonnelServices" ADD CONSTRAINT "_ClinicPersonnelServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
