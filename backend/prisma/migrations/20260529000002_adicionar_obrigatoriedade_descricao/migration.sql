/*
  Warnings:

  - Made the column `descricao` on table `notary_services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "notary_services" ALTER COLUMN "descricao" SET NOT NULL;
