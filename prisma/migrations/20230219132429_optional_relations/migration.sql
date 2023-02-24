-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_labelId_fkey";

-- AlterTable
ALTER TABLE "Release" ALTER COLUMN "artistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;
