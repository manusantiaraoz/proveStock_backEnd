/*
  Warnings:

  - Added the required column `totalAmount` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `ProductLine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ProductLine" ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;
