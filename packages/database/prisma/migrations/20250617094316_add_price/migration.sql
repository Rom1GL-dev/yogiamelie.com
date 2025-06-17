-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "extra" TEXT,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);
