/*
  Warnings:

  - You are about to drop the `Reflector` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Battery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Battery" ADD COLUMN     "certifications" TEXT[],
ADD COLUMN     "datasheet" TEXT,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "specs" TEXT[];

-- DropTable
DROP TABLE "Reflector";

-- CreateTable
CREATE TABLE "reflectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "specs" TEXT[],
    "features" TEXT[],
    "certifications" TEXT[],
    "datasheet" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reflectors_pkey" PRIMARY KEY ("id")
);
