/*
  Warnings:

  - You are about to drop the `BoardComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Boards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Avatars` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Avatars` DROP FOREIGN KEY `Avatars_userId_fkey`;

-- DropForeignKey
ALTER TABLE `BoardComments` DROP FOREIGN KEY `BoardComments_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `BoardComments` DROP FOREIGN KEY `BoardComments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Boards` DROP FOREIGN KEY `Boards_userId_fkey`;

-- DropTable
DROP TABLE `BoardComments`;

-- DropTable
DROP TABLE `Boards`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Events` (
    `id` VARCHAR(191) NOT NULL,
    `category` ENUM('GENERAL', 'PARTICIPATORY') NOT NULL,
    `title` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `thumbnailImageUrl` VARCHAR(191) NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `isExposed` BOOLEAN NOT NULL DEFAULT true,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Events_category_isDeleted_isExposed_idx`(`category`, `isDeleted`, `isExposed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notices` (
    `id` VARCHAR(191) NOT NULL,
    `category` ENUM('NOTICE', 'MARKET', 'MAINTENANCE', 'UPDATE') NOT NULL,
    `title` TEXT NOT NULL,
    `summary` TEXT NULL,
    `content` TEXT NOT NULL,
    `thumbnailImageUrl` VARCHAR(191) NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `isExposed` BOOLEAN NOT NULL DEFAULT true,
    `isFixed` BOOLEAN NOT NULL DEFAULT false,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Notices_category_isDeleted_isFixed_isExposed_idx`(`category`, `isDeleted`, `isFixed`, `isExposed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminPermissionGroups` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AdminPermissionGroups_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminPermissions` (
    `id` VARCHAR(191) NOT NULL,
    `adminPermissionGroupId` VARCHAR(191) NOT NULL,
    `code` ENUM('STUDIO', 'MARKET', 'WORLD', 'BOARD', 'SETTLEMENT', 'ACCOUNT', 'ADMIN', 'DESIGN') NOT NULL,
    `canQuery` BOOLEAN NOT NULL DEFAULT false,
    `canEdit` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `AdminPermissions_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `platform` INTEGER NOT NULL DEFAULT 1,
    `oauthId` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NULL,
    `sns` JSON NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `summary` VARCHAR(191) NULL,
    `profileImageUrl` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NOT NULL DEFAULT 'COLOR',
    `backgroundColor` VARCHAR(10) NULL,
    `backgroundImageUrl` VARCHAR(191) NULL,
    `status` ENUM('ALIVE', 'SLEEP', 'BLOCK', 'SIGNOUT') NOT NULL DEFAULT 'ALIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_nickname_key`(`nickname`),
    INDEX `Users_oauthId_idx`(`oauthId`),
    INDEX `Users_nickname_idx`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminUsers` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `password` VARCHAR(40) NOT NULL,
    `salt` VARCHAR(40) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `adminPermissionGroupId` VARCHAR(191) NOT NULL,
    `status` ENUM('ALIVE', 'SLEEP', 'BLOCK', 'SIGNOUT') NOT NULL DEFAULT 'ALIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdminUsers_accountId_key`(`accountId`),
    UNIQUE INDEX `AdminUsers_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityPosts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `category` ENUM('FREE', 'PHOTO', 'TIP') NOT NULL,
    `title` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `commentCount` INTEGER NOT NULL DEFAULT 0,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `thumbnailImageUrl` VARCHAR(191) NULL,
    `isFixed` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('LIVE', 'BLIND', 'WAIT_DELETE', 'DELETED') NOT NULL DEFAULT 'LIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CommunityPosts_category_status_isFixed_idx`(`category`, `status`, `isFixed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityComments` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `replyCount` INTEGER NOT NULL DEFAULT 0,
    `likeCount` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('LIVE', 'BLIND', 'WAIT_DELETE', 'DELETED') NOT NULL DEFAULT 'LIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CummunityReplies` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,
    `status` ENUM('LIVE', 'BLIND', 'WAIT_DELETE', 'DELETED') NOT NULL DEFAULT 'LIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityLikes` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `entityType` ENUM('POST', 'COMMENT', 'REPLIES') NOT NULL DEFAULT 'POST',
    `postId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,
    `replyId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CommunityLikes_entityType_userId_idx`(`entityType`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Avatars_userId_key` ON `Avatars`(`userId`);

-- AddForeignKey
ALTER TABLE `AdminPermissions` ADD CONSTRAINT `AdminPermissions_adminPermissionGroupId_fkey` FOREIGN KEY (`adminPermissionGroupId`) REFERENCES `AdminPermissionGroups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminUsers` ADD CONSTRAINT `AdminUsers_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminUsers` ADD CONSTRAINT `AdminUsers_adminPermissionGroupId_fkey` FOREIGN KEY (`adminPermissionGroupId`) REFERENCES `AdminPermissionGroups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityPosts` ADD CONSTRAINT `CommunityPosts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComments` ADD CONSTRAINT `CommunityComments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComments` ADD CONSTRAINT `CommunityComments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `CommunityPosts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CummunityReplies` ADD CONSTRAINT `CummunityReplies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CummunityReplies` ADD CONSTRAINT `CummunityReplies_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `CommunityPosts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CummunityReplies` ADD CONSTRAINT `CummunityReplies_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `CommunityComments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityLikes` ADD CONSTRAINT `CommunityLikes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityLikes` ADD CONSTRAINT `CommunityLikes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `CommunityPosts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityLikes` ADD CONSTRAINT `CommunityLikes_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `CommunityComments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityLikes` ADD CONSTRAINT `CommunityLikes_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `CummunityReplies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avatars` ADD CONSTRAINT `Avatars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
