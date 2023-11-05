/*
  Warnings:

  - You are about to drop the column `artistId` on the `Release` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_artistId_fkey";

-- AlterTable
ALTER TABLE "Release" DROP COLUMN "artistId";
