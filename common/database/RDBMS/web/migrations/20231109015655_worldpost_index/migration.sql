-- DropIndex
DROP INDEX `WorldPosts_tag_title_summary_idx` ON `WorldPosts`;

-- CreateIndex
CREATE FULLTEXT INDEX `WorldPosts_summary_title_tag_idx` ON `WorldPosts`(`summary`, `title`, `tag`);
