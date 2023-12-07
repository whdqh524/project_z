import { Controller, Get, Post, Put, Body, UseGuards, Query } from '@nestjs/common';

import {PostService} from './post.service';
import { AuthGuard, UserId, WhiteListManager } from "@project_z_web_backend/common";
import { GetPostDetailInputDto, GetPostInputDto } from "./dto/get.post.dto";
import { CreatePostInputDto } from "./dto/create.post.dto";
import { UpdatePostInputDto } from "./dto/update.post.dto";
import { PlayPostInputDto } from "./dto/play.post.dto";

@UseGuards(AuthGuard)
@Controller()
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly whiteListManager: WhiteListManager) {
		this.whiteListManager.addEndPoint(['/world/list', '/world/detail', '/world/keyword'])
	}

	@Get('list')
	async getPosts(@UserId() userId: string, @Query() query: GetPostInputDto): Promise<object> {
		if(userId) {
			query.userId= userId;
		}
		return await this.postService.getPosts(query);
	}


	@Post('post')
	async createPost(@UserId() userId: string, @Body() body: CreatePostInputDto): Promise<object> {
		body.userId = userId;
		return await this.postService.createPost(body);
	}

	@Put('update')
	async updatePost(@UserId() userId: string, @Body() body: UpdatePostInputDto): Promise<void> {
		body.userId = userId
		return await this.postService.updatePost(body);
	}

	@Get('detail')
	async getPostDetail(@UserId() userId: string, @Query() query: GetPostDetailInputDto): Promise<object> {
		return await this.postService.getPostDetail(userId, query.postId);
	}

	@Post('play')
	async playWorldPost(@UserId() userId: string, @Body() body: PlayPostInputDto): Promise<void> {
		return await this.postService.playWorldPost(userId, body.postId);
	}

	@Get('keyword')
	async getKeywordRank(): Promise<object> {
		return await this.postService.getWorldKeywordRank();
	}
}
