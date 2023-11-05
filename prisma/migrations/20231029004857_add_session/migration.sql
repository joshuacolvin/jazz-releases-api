/*
  Warnings:

  - You are about to drop the column `releaseId` on the `Personnel` table. All the data in the column will be lost.
  - You are about to drop the column `studioId` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `Track` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `Personnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Personnel" DROP CONSTRAINT "Personnel_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_studioId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_releaseId_fkey";

-- AlterTable
ALTER TABLE "Personnel" DROP COLUMN "releaseId",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Release" DROP COLUMN "studioId";

-- AlterTable
ALTER TABLE "Studio" ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "releaseId",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "releaseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studioId" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
