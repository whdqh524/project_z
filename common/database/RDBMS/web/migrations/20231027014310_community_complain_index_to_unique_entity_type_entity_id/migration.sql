/*
  Warnings:

  - A unique constraint covering the columns `[entityType,entityId]` on the table `CommunityComplains` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `CommunityComplains_entityType_entityId_idx` ON `CommunityComplains`;

-- AlterTable
ALTER TABLE `CommunityComplainDetails` ADD COLUMN `commentId` VARCHAR(191) NULL,
    ADD COLUMN `postId` VARCHAR(191) NULL,
    ADD COLUMN `replyId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CommunityComplains_entityType_entityId_key` ON `CommunityComplains`(`entityType`, `entityId`);

-- AddForeignKey
ALTER TABLE `CommunityComplainDetails` ADD CONSTRAINT `CommunityComplainDetails_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `CommunityPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComplainDetails` ADD CONSTRAINT `CommunityComplainDetails_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `CommunityComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComplainDetails` ADD CONSTRAINT `CommunityComplainDetails_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `CummunityReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
