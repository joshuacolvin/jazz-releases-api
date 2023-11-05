/*
  Warnings:

  - You are about to drop the column `recordedBy` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Release" ADD COLUMN     "designerId" TEXT,
ADD COLUMN     "engineerId" TEXT,
ADD COLUMN     "photographerId" TEXT,
ADD COLUMN     "producerId" TEXT;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "recordedBy";

-- CreateTable
CREATE TABLE "Engineer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Engineer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Designer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photographer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Photographer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Engineer_id_key" ON "Engineer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_id_key" ON "Producer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Designer_id_key" ON "Designer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Photographer_id_key" ON "Photographer"("id");

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "Photographer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
