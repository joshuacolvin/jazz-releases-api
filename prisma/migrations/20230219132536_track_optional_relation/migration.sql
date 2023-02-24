-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_releaseId_fkey";

-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "releaseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE SET NULL ON UPDATE CASCADE;
