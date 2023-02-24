/*
  Warnings:

  - You are about to drop the column `artistId` on the `Personnel` table. All the data in the column will be lost.
  - Added the required column `artist` to the `Personnel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Personnel" DROP CONSTRAINT "Personnel_artistId_fkey";

-- AlterTable
ALTER TABLE "Personnel" DROP COLUMN "artistId",
ADD COLUMN     "artist" TEXT NOT NULL;
