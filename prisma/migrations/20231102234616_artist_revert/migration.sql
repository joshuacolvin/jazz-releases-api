/*
  Warnings:

  - You are about to drop the column `firstName` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `Personnel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Personnel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Personnel" DROP CONSTRAINT "Personnel_artistId_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Personnel" DROP COLUMN "artistId",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");
