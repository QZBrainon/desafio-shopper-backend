-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "measureDatetime" TIMESTAMP(3) NOT NULL,
    "measureType" "MeasureType" NOT NULL,
    "measureValue" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Measure_measureDatetime_measureType_key" ON "Measure"("measureDatetime", "measureType");
