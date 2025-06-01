/*
  Warnings:

  - You are about to drop the column `description` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `message` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "subtitle",
DROP COLUMN "title",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
