/*
  Warnings:

  - You are about to drop the column `recorded` on the `Release` table. All the data in the column will be lost.
  - The `released` column on the `Release` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `artistId` on table `Release` required. This step will fail if there are existing NULL values in that column.
  - Made the column `releaseId` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number` on table `Track` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Release" DROP COLUMN "recorded",
ALTER COLUMN "artistId" SET NOT NULL,
DROP COLUMN "released",
ADD COLUMN     "released" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "releaseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "number" SET NOT NULL;
