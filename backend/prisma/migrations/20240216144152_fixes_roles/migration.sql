/*
  Warnings:

  - The values [TEACHER,STAFF] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'STAFF';

-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('STUDENT', 'EMPLOYEE');
ALTER TABLE "Patient" ALTER COLUMN "patientType" TYPE "Type_new" USING ("patientType"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;
