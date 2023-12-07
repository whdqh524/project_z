/*
  Warnings:

  - You are about to alter the column `salt` on the `AdminUsers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(40)` to `VarChar(32)`.

*/
-- DropForeignKey
ALTER TABLE `AdminUsers` DROP FOREIGN KEY `AdminUsers_adminPermissionGroupId_fkey`;

-- AlterTable
ALTER TABLE `AdminUsers` ADD COLUMN `accessedAt` DATETIME(3) NULL,
    MODIFY `password` VARCHAR(64) NOT NULL,
    MODIFY `salt` VARCHAR(32) NOT NULL,
    MODIFY `department` VARCHAR(191) NULL,
    MODIFY `adminPermissionGroupId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CummunityReplies` ADD COLUMN `likeCount` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `AdminUsers` ADD CONSTRAINT `AdminUsers_adminPermissionGroupId_fkey` FOREIGN KEY (`adminPermissionGroupId`) REFERENCES `AdminPermissionGroups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
