/*
  Warnings:

  - You are about to drop the column `artist` on the `Personnel` table. All the data in the column will be lost.
  - Added the required column `name` to the `Personnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personnel" DROP COLUMN "artist",
ADD COLUMN     "name" TEXT NOT NULL;
