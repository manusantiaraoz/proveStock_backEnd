/*
  Warnings:

  - Changed the type of `p_purchase` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `p_sale` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "p_purchase",
ADD COLUMN     "p_purchase" DOUBLE PRECISION NOT NULL,
DROP COLUMN "p_sale",
ADD COLUMN     "p_sale" DOUBLE PRECISION NOT NULL;
