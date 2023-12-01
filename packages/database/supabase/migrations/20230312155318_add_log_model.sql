-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "json" JSONB NOT NULL,
    "syncId" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Log_syncId_key" ON "Log"("syncId");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_syncId_fkey" FOREIGN KEY ("syncId") REFERENCES "Sync"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
