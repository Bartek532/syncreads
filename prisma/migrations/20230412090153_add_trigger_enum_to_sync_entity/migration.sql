/*
  Warnings:

  - Added the required column `trigger` to the `Sync` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SyncTrigger" AS ENUM ('MANUAL', 'SCHEDULE');

-- AlterTable
ALTER TABLE "Sync" ADD COLUMN     "trigger" "SyncTrigger" NOT NULL;
