/*
  Warnings:

  - You are about to drop the column `designer` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `engineer` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `photographer` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `producer` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `Release` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Release" DROP COLUMN "designer",
DROP COLUMN "engineer",
DROP COLUMN "photographer",
DROP COLUMN "producer",
DROP COLUMN "recordedAt",
ADD COLUMN     "designerId" TEXT,
ADD COLUMN     "engineerId" TEXT,
ADD COLUMN     "photographerId" TEXT,
ADD COLUMN     "producerId" TEXT,
ADD COLUMN     "studioId" TEXT;

-- CreateTable
CREATE TABLE "Designer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Designer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engineer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Engineer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photographer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Photographer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Designer_id_key" ON "Designer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Engineer_id_key" ON "Engineer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Photographer_id_key" ON "Photographer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_id_key" ON "Producer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_id_key" ON "Studio"("id");

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "Photographer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
