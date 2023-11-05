/*
  Warnings:

  - You are about to drop the column `name` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Personnel` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Personnel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Artist_name_key";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT;

-- AlterTable
ALTER TABLE "Personnel" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT;
