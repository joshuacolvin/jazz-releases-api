/*
  Warnings:

  - Added the required column `artistId` to the `Release` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Release" ADD COLUMN     "artistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
