/*
  Warnings:

  - You are about to drop the column `engineerId` on the `Release` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_engineerId_fkey";

-- AlterTable
ALTER TABLE "Release" DROP COLUMN "engineerId";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "engineerId" TEXT;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
