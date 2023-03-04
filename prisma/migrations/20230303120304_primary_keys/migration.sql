/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Label` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Personnel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Release` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Personnel" DROP CONSTRAINT "Personnel_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_releaseId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Label_id_key" ON "Label"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Personnel_id_key" ON "Personnel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Release_id_key" ON "Release"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Track_id_key" ON "Track"("id");

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;
