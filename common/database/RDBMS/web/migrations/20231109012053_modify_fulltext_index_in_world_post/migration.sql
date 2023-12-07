-- DropIndex
DROP INDEX `WorldPosts_title_content_tag_summary_idx` ON `WorldPosts`;

-- CreateIndex
CREATE FULLTEXT INDEX `WorldPosts_tag_title_summary_idx` ON `WorldPosts`(`tag`, `title`, `summary`);
