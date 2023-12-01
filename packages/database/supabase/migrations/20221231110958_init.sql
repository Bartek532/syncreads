-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "deviceToken" TEXT NOT NULL,
    "lastSyncDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FeedToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Feed_url_key" ON "Feed"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_FeedToUser_AB_unique" ON "_FeedToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedToUser_B_index" ON "_FeedToUser"("B");

-- AddForeignKey
ALTER TABLE "_FeedToUser" ADD CONSTRAINT "_FeedToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedToUser" ADD CONSTRAINT "_FeedToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
