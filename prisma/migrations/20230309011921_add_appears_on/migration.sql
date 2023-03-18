/*
  Warnings:

  - You are about to drop the `_PersonnelToTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PersonnelToTrack" DROP CONSTRAINT "_PersonnelToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersonnelToTrack" DROP CONSTRAINT "_PersonnelToTrack_B_fkey";

-- AlterTable
ALTER TABLE "Personnel" ADD COLUMN     "appearsOn" TEXT[];

-- DropTable
DROP TABLE "_PersonnelToTrack";
