/*
  Warnings:

  - Added the required column `content` to the `CummunityReplies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CummunityReplies` ADD COLUMN `content` TEXT NOT NULL;
