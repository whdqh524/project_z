/*
  Warnings:

  - You are about to alter the column `process` on the `CommunityComplains` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `CommunityComplains` MODIFY `process` BOOLEAN NOT NULL DEFAULT false;
