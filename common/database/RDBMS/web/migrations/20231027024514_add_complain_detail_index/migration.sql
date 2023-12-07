/*
  Warnings:

  - A unique constraint covering the columns `[userId,communityComplainId]` on the table `CommunityComplainDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `CommunityComments` MODIFY `content` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `CummunityReplies` MODIFY `content` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CommunityComplainDetails_userId_communityComplainId_key` ON `CommunityComplainDetails`(`userId`, `communityComplainId`);
