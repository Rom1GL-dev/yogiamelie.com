/*
  Warnings:

  - Added the required column `image` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "lieu" TEXT,
ADD COLUMN     "parking" TEXT,
ADD COLUMN     "planning" TEXT,
ADD COLUMN     "subtitle" TEXT NOT NULL;
