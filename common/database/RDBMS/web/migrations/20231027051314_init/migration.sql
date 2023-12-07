/*
  Warnings:

  - Added the required column `userId` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Notices` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `CommunityPosts_title_content_idx` ON `CommunityPosts`;

-- DropIndex
DROP INDEX `Events_title_content_idx` ON `Events`;

-- DropIndex
DROP INDEX `Notices_title_content_idx` ON `Notices`;

-- AlterTable
ALTER TABLE `Events` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Notices` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notices` ADD CONSTRAINT `Notices_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
