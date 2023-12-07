/*
  Warnings:

  - You are about to drop the column `canQuery` on the `AdminPermissions` table. All the data in the column will be lost.
  - You are about to alter the column `code` on the `AdminPermissions` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(20)`.
  - You are about to alter the column `status` on the `AdminUsers` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(7))` to `VarChar(20)`.
  - You are about to alter the column `status` on the `CommunityComments` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `VarChar(20)`.
  - You are about to alter the column `entityType` on the `CommunityLikes` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(20)`.
  - You are about to alter the column `category` on the `CommunityPosts` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(20)`.
  - You are about to alter the column `status` on the `CommunityPosts` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(9))` to `VarChar(20)`.
  - You are about to alter the column `status` on the `CummunityReplies` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `VarChar(20)`.
  - You are about to alter the column `category` on the `Events` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(20)`.
  - You are about to alter the column `category` on the `Notices` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(20)`.
  - You are about to alter the column `backgroundType` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(8))` to `VarChar(20)`.
  - You are about to alter the column `status` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(10))` to `VarChar(20)`.

*/
-- DropIndex
DROP INDEX `AdminPermissions_code_key` ON `AdminPermissions`;

-- AlterTable
ALTER TABLE `AdminPermissions` DROP COLUMN `canQuery`,
    MODIFY `code` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `AdminUsers` MODIFY `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE';

-- AlterTable
ALTER TABLE `CommunityComments` MODIFY `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE';

-- AlterTable
ALTER TABLE `CommunityLikes` MODIFY `entityType` VARCHAR(20) NOT NULL DEFAULT 'POST';

-- AlterTable
ALTER TABLE `CommunityPosts` MODIFY `category` VARCHAR(20) NOT NULL,
    MODIFY `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE';

-- AlterTable
ALTER TABLE `CummunityReplies` MODIFY `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE';

-- AlterTable
ALTER TABLE `Events` MODIFY `category` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Notices` MODIFY `category` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `backgroundType` VARCHAR(20) NOT NULL DEFAULT 'COLOR',
    MODIFY `status` VARCHAR(20) NOT NULL DEFAULT 'ALIVE';

-- CreateIndex
CREATE INDEX `AdminPermissions_adminPermissionGroupId_code_idx` ON `AdminPermissions`(`adminPermissionGroupId`, `code`);
