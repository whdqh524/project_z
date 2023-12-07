-- CreateIndex
CREATE FULLTEXT INDEX `BoardPosts_title_content_idx` ON `BoardPosts`(`title`, `content`);
