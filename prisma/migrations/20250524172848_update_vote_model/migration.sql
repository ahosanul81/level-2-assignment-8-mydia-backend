/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ideaId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "votes_memberId_key" ON "votes"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "votes_ideaId_key" ON "votes"("ideaId");
