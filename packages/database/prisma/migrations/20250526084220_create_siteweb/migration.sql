/*
  Warnings:

  - The primary key for the `SiteWebDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SiteWebDetail" DROP CONSTRAINT "SiteWebDetail_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SiteWebDetail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SiteWebDetail_id_seq";
