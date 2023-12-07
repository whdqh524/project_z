-- AlterTable
ALTER TABLE `CommunityComplains` ALTER COLUMN `entityType` DROP DEFAULT;

-- CreateTable
CREATE TABLE `WorldPosts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `category` VARCHAR(20) NOT NULL,
    `mapGUID` BIGINT NOT NULL,
    `tag` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `summary` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `playCount` INTEGER NOT NULL DEFAULT 0,
    `commentCount` INTEGER NOT NULL DEFAULT 0,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `thumbnailImageUrl` JSON NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `WorldPosts_category_status_idx`(`category`, `status`),
    FULLTEXT INDEX `WorldPosts_title_idx`(`title`),
    FULLTEXT INDEX `WorldPosts_content_idx`(`content`),
    FULLTEXT INDEX `WorldPosts_tag_idx`(`tag`),
    FULLTEXT INDEX `WorldPosts_summary_idx`(`summary`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorldComments` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(200) NOT NULL,
    `replyCount` INTEGER NOT NULL DEFAULT 0,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorldReplies` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(200) NOT NULL,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorldComplains` (
    `id` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(20) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `process` BOOLEAN NOT NULL DEFAULT false,
    `postId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,
    `replyId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WorldComplains_postId_key`(`postId`),
    UNIQUE INDEX `WorldComplains_commentId_key`(`commentId`),
    UNIQUE INDEX `WorldComplains_replyId_key`(`replyId`),
    UNIQUE INDEX `WorldComplains_entityType_entityId_key`(`entityType`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorldComplainDetails` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `worldComplainId` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(20) NOT NULL,
    `content` TEXT NOT NULL,
    `postId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,
    `replyId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WorldComplainDetails_userId_worldComplainId_key`(`userId`, `worldComplainId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorldLikes` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(20) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,
    `replyId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `WorldLikes_entityType_userId_idx`(`entityType`, `userId`),
    UNIQUE INDEX `WorldLikes_userId_entityId_key`(`userId`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorldPosts` ADD CONSTRAINT `WorldPosts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComments` ADD CONSTRAINT `WorldComments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComments` ADD CONSTRAINT `WorldComments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `WorldPosts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldReplies` ADD CONSTRAINT `WorldReplies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldReplies` ADD CONSTRAINT `WorldReplies_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `WorldPosts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldReplies` ADD CONSTRAINT `WorldReplies_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `WorldComments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComplains` ADD CONSTRAINT `WorldComplains_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `WorldPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComplains` ADD CONSTRAINT `WorldComplains_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `WorldComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComplains` ADD CONSTRAINT `WorldComplains_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `WorldReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComplainDetails` ADD CONSTRAINT `WorldComplainDetails_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComplainDetails` ADD CONSTRAINT `WorldComplainDetails_worldComplainId_fkey` FOREIGN KEY (`worldComplainId`) REFERENCES `WorldComplains`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComplainDetails` ADD CONSTRAINT `WorldComplainDetails_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `WorldPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComplainDetails` ADD CONSTRAINT `WorldComplainDetails_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `WorldComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldComplainDetails` ADD CONSTRAINT `WorldComplainDetails_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `WorldReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldLikes` ADD CONSTRAINT `WorldLikes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldLikes` ADD CONSTRAINT `WorldLikes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `WorldPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldLikes` ADD CONSTRAINT `WorldLikes_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `WorldComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorldLikes` ADD CONSTRAINT `WorldLikes_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `WorldReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
