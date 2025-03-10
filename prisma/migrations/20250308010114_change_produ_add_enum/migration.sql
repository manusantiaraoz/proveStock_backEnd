-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CONFIRM');

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DEFAULT 'user',
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "phone" SET DEFAULT '';
