/*
  Warnings:

  - Made the column `detail` on table `Budget` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "detail" SET NOT NULL;
