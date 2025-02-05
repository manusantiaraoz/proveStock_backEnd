/*
  Warnings:

  - You are about to drop the `_productBudget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_productBudget" DROP CONSTRAINT "_productBudget_A_fkey";

-- DropForeignKey
ALTER TABLE "_productBudget" DROP CONSTRAINT "_productBudget_B_fkey";

-- DropTable
DROP TABLE "_productBudget";

-- CreateTable
CREATE TABLE "ProductLine" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductLine" ADD CONSTRAINT "ProductLine_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLine" ADD CONSTRAINT "ProductLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
