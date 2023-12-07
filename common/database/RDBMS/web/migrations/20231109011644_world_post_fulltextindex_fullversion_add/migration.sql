-- CreateIndex
CREATE FULLTEXT INDEX `WorldPosts_title_content_tag_summary_idx` ON `WorldPosts`(`title`, `content`, `tag`, `summary`);
