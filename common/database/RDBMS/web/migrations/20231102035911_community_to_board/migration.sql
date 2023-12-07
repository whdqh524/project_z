/*
  Warnings:

  - You are about to drop the `CommunityComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityComplainDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityComplains` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunityPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CummunityReplies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CommunityComments` DROP FOREIGN KEY `CommunityComments_postId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComments` DROP FOREIGN KEY `CommunityComments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComplainDetails` DROP FOREIGN KEY `CommunityComplainDetails_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComplainDetails` DROP FOREIGN KEY `CommunityComplainDetails_communityComplainId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComplainDetails` DROP FOREIGN KEY `CommunityComplainDetails_postId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComplainDetails` DROP FOREIGN KEY `CommunityComplainDetails_replyId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComplainDetails` DROP FOREIGN KEY `CommunityComplainDetails_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComplains` DROP FOREIGN KEY `CommunityComplains_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComplains` DROP FOREIGN KEY `CommunityComplains_postId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityComplains` DROP FOREIGN KEY `CommunityComplains_replyId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityLikes` DROP FOREIGN KEY `CommunityLikes_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityLikes` DROP FOREIGN KEY `CommunityLikes_postId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityLikes` DROP FOREIGN KEY `CommunityLikes_replyId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityLikes` DROP FOREIGN KEY `CommunityLikes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CommunityPosts` DROP FOREIGN KEY `CommunityPosts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CummunityReplies` DROP FOREIGN KEY `CummunityReplies_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `CummunityReplies` DROP FOREIGN KEY `CummunityReplies_postId_fkey`;

-- DropForeignKey
ALTER TABLE `CummunityReplies` DROP FOREIGN KEY `CummunityReplies_userId_fkey`;

-- DropTable
DROP TABLE `CommunityComments`;

-- DropTable
DROP TABLE `CommunityComplainDetails`;

-- DropTable
DROP TABLE `CommunityComplains`;

-- DropTable
DROP TABLE `CommunityLikes`;

-- DropTable
DROP TABLE `CommunityPosts`;

-- DropTable
DROP TABLE `CummunityReplies`;

-- CreateTable
CREATE TABLE `BoardPosts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `board` VARCHAR(20) NOT NULL,
    `category` VARCHAR(20) NOT NULL,
    `title` TEXT NOT NULL,
    `summary` TEXT NULL,
    `content` TEXT NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `commentCount` INTEGER NOT NULL DEFAULT 0,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `thumbnailImageUrl` VARCHAR(191) NULL,
    `isExposed` BOOLEAN NOT NULL DEFAULT true,
    `isFixed` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE',
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `BoardPosts_board_category_status_isFixed_isExposed_idx`(`board`, `category`, `status`, `isFixed`, `isExposed`),
    FULLTEXT INDEX `BoardPosts_title_idx`(`title`),
    FULLTEXT INDEX `BoardPosts_content_idx`(`content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BoardComments` (
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
CREATE TABLE `BoardReplies` (
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
CREATE TABLE `BoardComplains` (
    `id` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(20) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `process` BOOLEAN NOT NULL DEFAULT false,
    `postId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,
    `replyId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BoardComplains_postId_key`(`postId`),
    UNIQUE INDEX `BoardComplains_commentId_key`(`commentId`),
    UNIQUE INDEX `BoardComplains_replyId_key`(`replyId`),
    UNIQUE INDEX `BoardComplains_entityType_entityId_key`(`entityType`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BoardComplainDetails` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `boardComplainId` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(20) NOT NULL,
    `content` TEXT NOT NULL,
    `postId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,
    `replyId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BoardComplainDetails_userId_boardComplainId_key`(`userId`, `boardComplainId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BoardLikes` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(20) NOT NULL DEFAULT 'Post',
    `entityId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,
    `replyId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `BoardLikes_entityType_userId_idx`(`entityType`, `userId`),
    UNIQUE INDEX `BoardLikes_userId_entityId_key`(`userId`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BoardPosts` ADD CONSTRAINT `BoardPosts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComments` ADD CONSTRAINT `BoardComments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComments` ADD CONSTRAINT `BoardComments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BoardPosts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardReplies` ADD CONSTRAINT `BoardReplies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardReplies` ADD CONSTRAINT `BoardReplies_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BoardPosts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardReplies` ADD CONSTRAINT `BoardReplies_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `BoardComments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComplains` ADD CONSTRAINT `BoardComplains_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BoardPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComplains` ADD CONSTRAINT `BoardComplains_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `BoardComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComplains` ADD CONSTRAINT `BoardComplains_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `BoardReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComplainDetails` ADD CONSTRAINT `BoardComplainDetails_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComplainDetails` ADD CONSTRAINT `BoardComplainDetails_boardComplainId_fkey` FOREIGN KEY (`boardComplainId`) REFERENCES `BoardComplains`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComplainDetails` ADD CONSTRAINT `BoardComplainDetails_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BoardPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComplainDetails` ADD CONSTRAINT `BoardComplainDetails_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `BoardComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardComplainDetails` ADD CONSTRAINT `BoardComplainDetails_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `BoardReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardLikes` ADD CONSTRAINT `BoardLikes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardLikes` ADD CONSTRAINT `BoardLikes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BoardPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardLikes` ADD CONSTRAINT `BoardLikes_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `BoardComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardLikes` ADD CONSTRAINT `BoardLikes_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `BoardReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
