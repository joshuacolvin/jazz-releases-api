/*
  Warnings:

  - You are about to drop the column `name` on the `Personnel` table. All the data in the column will be lost.
  - Added the required column `artistId` to the `Personnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personnel" DROP COLUMN "name",
ADD COLUMN     "artistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
