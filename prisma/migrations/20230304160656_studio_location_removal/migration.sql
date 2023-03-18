/*
  Warnings:

  - You are about to drop the column `location` on the `Studio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Studio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Studio_location_key";

-- AlterTable
ALTER TABLE "Studio" DROP COLUMN "location";

-- CreateIndex
CREATE UNIQUE INDEX "Studio_name_key" ON "Studio"("name");
