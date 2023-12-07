/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `AdminUsers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AdminUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AdminUsers` DROP FOREIGN KEY `AdminUsers_accountId_fkey`;

-- AlterTable
ALTER TABLE `AdminUsers` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AdminUsers_userId_key` ON `AdminUsers`(`userId`);

-- AddForeignKey
ALTER TABLE `AdminUsers` ADD CONSTRAINT `AdminUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
