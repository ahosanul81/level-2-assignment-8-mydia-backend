/*
  Warnings:

  - A unique constraint covering the columns `[memberId,ideaId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('un_paid', 'paid');

-- DropIndex
DROP INDEX "votes_ideaId_key";

-- DropIndex
DROP INDEX "votes_memberId_key";

-- AlterTable
ALTER TABLE "ideas" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'un_paid',
    "paymentGatewayData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "votes_memberId_ideaId_key" ON "votes"("memberId", "ideaId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "ideas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
