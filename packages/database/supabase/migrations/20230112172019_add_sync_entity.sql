-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Sync" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" "SyncStatus" NOT NULL,
    "syncedArticlesCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sync_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
