/*
  Warnings:

  - You are about to drop the column `email` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dni]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "Provider_dni_key" ON "Provider"("dni");
