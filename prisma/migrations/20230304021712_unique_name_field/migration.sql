/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Designer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Engineer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Photographer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Studio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Designer_name_key" ON "Designer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Engineer_name_key" ON "Engineer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Photographer_name_key" ON "Photographer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_name_key" ON "Producer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_name_key" ON "Studio"("name");
