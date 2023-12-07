-- AlterTable
ALTER TABLE `CommunityLikes` MODIFY `entityType` VARCHAR(20) NOT NULL DEFAULT 'Post';

-- CreateTable
CREATE TABLE `CommunityComplains` (
    `id` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(20) NOT NULL DEFAULT 'Post',
    `entityId` VARCHAR(191) NOT NULL,
    `process` VARCHAR(20) NOT NULL,
    `postId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,
    `replyId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CommunityComplains_postId_key`(`postId`),
    UNIQUE INDEX `CommunityComplains_commentId_key`(`commentId`),
    UNIQUE INDEX `CommunityComplains_replyId_key`(`replyId`),
    INDEX `CommunityComplains_entityType_entityId_idx`(`entityType`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityComplainDetails` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `communityComplainId` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(20) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommunityComplains` ADD CONSTRAINT `CommunityComplains_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `CommunityPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComplains` ADD CONSTRAINT `CommunityComplains_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `CommunityComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComplains` ADD CONSTRAINT `CommunityComplains_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `CummunityReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComplainDetails` ADD CONSTRAINT `CommunityComplainDetails_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComplainDetails` ADD CONSTRAINT `CommunityComplainDetails_communityComplainId_fkey` FOREIGN KEY (`communityComplainId`) REFERENCES `CommunityComplains`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
