-- CreateIndex
CREATE FULLTEXT INDEX `CommunityPosts_title_idx` ON `CommunityPosts`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `CommunityPosts_content_idx` ON `CommunityPosts`(`content`);

-- CreateIndex
CREATE FULLTEXT INDEX `CommunityPosts_title_content_idx` ON `CommunityPosts`(`title`, `content`);

-- CreateIndex
CREATE FULLTEXT INDEX `Events_title_idx` ON `Events`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `Events_content_idx` ON `Events`(`content`);

-- CreateIndex
CREATE FULLTEXT INDEX `Events_title_content_idx` ON `Events`(`title`, `content`);

-- CreateIndex
CREATE FULLTEXT INDEX `Notices_title_idx` ON `Notices`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `Notices_content_idx` ON `Notices`(`content`);

-- CreateIndex
CREATE FULLTEXT INDEX `Notices_title_content_idx` ON `Notices`(`title`, `content`);
