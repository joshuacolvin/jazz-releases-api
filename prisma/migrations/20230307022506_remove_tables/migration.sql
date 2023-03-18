/*
  Warnings:

  - You are about to drop the column `designerId` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `engineerId` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `photographerId` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `producerId` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `studioId` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the `Designer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Engineer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photographer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Studio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_designerId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_engineerId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_photographerId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_producerId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_studioId_fkey";

-- AlterTable
ALTER TABLE "Release" DROP COLUMN "designerId",
DROP COLUMN "engineerId",
DROP COLUMN "photographerId",
DROP COLUMN "producerId",
DROP COLUMN "studioId";

-- DropTable
DROP TABLE "Designer";

-- DropTable
DROP TABLE "Engineer";

-- DropTable
DROP TABLE "Photographer";

-- DropTable
DROP TABLE "Producer";

-- DropTable
DROP TABLE "Studio";
