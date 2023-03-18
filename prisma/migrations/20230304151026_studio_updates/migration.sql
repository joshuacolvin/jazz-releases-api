/*
  Warnings:

  - A unique constraint covering the columns `[location]` on the table `Studio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Studio` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Studio_name_key";

-- AlterTable
ALTER TABLE "Studio" ADD COLUMN     "location" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Studio_location_key" ON "Studio"("location");
