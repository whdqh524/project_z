/*
  Warnings:

  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `board` to the `CommunityPosts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Events` DROP FOREIGN KEY `Events_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Notices` DROP FOREIGN KEY `Notices_userId_fkey`;

-- DropIndex
DROP INDEX `CommunityPosts_category_status_isFixed_idx` ON `CommunityPosts`;

-- AlterTable
ALTER TABLE `CommunityPosts` ADD COLUMN `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `board` VARCHAR(20) NOT NULL,
    ADD COLUMN `isExposed` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `summary` TEXT NULL;

-- DropTable
DROP TABLE `Events`;

-- DropTable
DROP TABLE `Notices`;

-- CreateIndex
CREATE INDEX `CommunityPosts_board_category_status_isFixed_isExposed_idx` ON `CommunityPosts`(`board`, `category`, `status`, `isFixed`, `isExposed`);
