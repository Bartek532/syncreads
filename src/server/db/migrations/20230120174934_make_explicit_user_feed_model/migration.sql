/*
  Warnings:

  - You are about to drop the column `lastSyncDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `startArticlesCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_FeedToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FeedToUser" DROP CONSTRAINT "_FeedToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FeedToUser" DROP CONSTRAINT "_FeedToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastSyncDate",
DROP COLUMN "startArticlesCount";

-- DropTable
DROP TABLE "_FeedToUser";

-- CreateTable
CREATE TABLE "UserFeed" (
    "userId" INTEGER NOT NULL,
    "feedId" INTEGER NOT NULL,
    "lastSyncDate" TIMESTAMP(3),
    "startArticlesCount" INTEGER NOT NULL DEFAULT 1
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFeed_userId_feedId_key" ON "UserFeed"("userId", "feedId");

-- AddForeignKey
ALTER TABLE "UserFeed" ADD CONSTRAINT "UserFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFeed" ADD CONSTRAINT "UserFeed_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
