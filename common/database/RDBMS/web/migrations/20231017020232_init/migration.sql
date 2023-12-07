-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `platform` INTEGER NOT NULL DEFAULT 1,
    `oauthId` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NULL,
    `sns` JSON NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `summary` VARCHAR(191) NULL,
    `profileImageUrl` VARCHAR(191) NULL,
    `backgroundColor` VARCHAR(10) NULL,
    `backgroundImageUrl` VARCHAR(191) NULL,
    `background` ENUM('COLOR', 'IMAGE') NOT NULL DEFAULT 'COLOR',
    `status` ENUM('ALIVE', 'SLEEP', 'BLOCK', 'SIGNOUT') NOT NULL DEFAULT 'ALIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avatars` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `ACGUID` VARCHAR(191) NOT NULL,
    `CHGUID` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `avatars` ADD CONSTRAINT `avatars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
