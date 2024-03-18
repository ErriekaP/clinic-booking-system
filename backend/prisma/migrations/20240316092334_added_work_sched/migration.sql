-- CreateTable
CREATE TABLE "WorkSchedule" (
    "id" SERIAL NOT NULL,
    "timeFrom" TIMESTAMP(3) NOT NULL,
    "timeTo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClinicPersonnelWorkSchedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicPersonnelWorkSchedule_AB_unique" ON "_ClinicPersonnelWorkSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicPersonnelWorkSchedule_B_index" ON "_ClinicPersonnelWorkSchedule"("B");

-- AddForeignKey
ALTER TABLE "_ClinicPersonnelWorkSchedule" ADD CONSTRAINT "_ClinicPersonnelWorkSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "ClinicPersonnel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicPersonnelWorkSchedule" ADD CONSTRAINT "_ClinicPersonnelWorkSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
