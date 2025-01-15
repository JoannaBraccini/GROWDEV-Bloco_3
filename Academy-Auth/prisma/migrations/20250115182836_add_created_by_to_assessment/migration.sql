/*
  Warnings:

  - Added the required column `created_by` to the `assessments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assessments" ADD COLUMN     "created_by" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
