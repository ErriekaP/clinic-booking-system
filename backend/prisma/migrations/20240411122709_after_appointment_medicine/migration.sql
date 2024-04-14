-- CreateTable
CREATE TABLE "AfterAppointment" (
    "id" SERIAL NOT NULL,
    "appointmentID" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,

    CONSTRAINT "AfterAppointment_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "AfterAppointment_appointmentID_key" ON "AfterAppointment"("appointmentID");

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_afterAppointmentID_key" ON "Medicine"("afterAppointmentID");

-- AddForeignKey
ALTER TABLE "AfterAppointment" ADD CONSTRAINT "AfterAppointment_appointmentID_fkey" FOREIGN KEY ("appointmentID") REFERENCES "Appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_afterAppointmentID_fkey" FOREIGN KEY ("afterAppointmentID") REFERENCES "AfterAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
