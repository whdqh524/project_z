/*
  Warnings:

  - A unique constraint covering the columns `[userId,entityId]` on the table `CommunityLikes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entityId` to the `CommunityLikes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CommunityLikes` ADD COLUMN `entityId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CommunityLikes_userId_entityId_key` ON `CommunityLikes`(`userId`, `entityId`);
