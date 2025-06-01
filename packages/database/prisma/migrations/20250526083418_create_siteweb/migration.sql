-- CreateTable
CREATE TABLE "SiteWebDetail" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SiteWebDetail_pkey" PRIMARY KEY ("id")
);
