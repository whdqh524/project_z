-- DropIndex
DROP INDEX `WorldPosts_content_idx` ON `WorldPosts`;

-- CreateTable
CREATE TABLE `DemoLinks` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(10) NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `url` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DemoLinks_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
