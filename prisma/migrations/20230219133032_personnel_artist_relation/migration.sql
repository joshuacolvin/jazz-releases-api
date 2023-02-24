/*
  Warnings:

  - You are about to drop the column `name` on the `Personnel` table. All the data in the column will be lost.
  - Made the column `leader` on table `Personnel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Personnel" DROP COLUMN "name",
ADD COLUMN     "artistId" TEXT,
ALTER COLUMN "leader" SET NOT NULL,
ALTER COLUMN "leader" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
