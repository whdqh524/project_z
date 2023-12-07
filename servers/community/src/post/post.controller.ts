import { Controller, Get, Post, Put, Body, UseGuards, Query, Param, Delete } from '@nestjs/common';

import {PostService} from './post.service';
import { AuthGuard, WhiteListManager, UserId, GENERAL_BORAD_CATEGORYS, ParameterError } from "@project_z_web_backend/common";
import { GetPostDetailInputDto, GetPostInputDto } from "./dto/get.post.dto";
import { CreatePostInputDto } from "./dto/create.post.dto";
import { UpdatePostInputDto } from "./dto/update.post.dto";
import { DeletePostInputDto } from "./dto/delete.post.dto";
import { ValidationError } from "class-validator";


@UseGuards(AuthGuard)
@Controller()
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly whiteListManager: WhiteListManager) {
		for(const category of GENERAL_BORAD_CATEGORYS) {
			this.whiteListManager.addEndPoint([`/community/list/${category}`]);
		}
		this.whiteListManager.addEndPoint([`/community/detail`]);
	}

	@Get('list/:category')
	async getPosts(@UserId() userId: string, @Query() query: GetPostInputDto, @Param() params: any): Promise<object> {
		if(userId) {
			query.userId= userId;
		}
		this.checkCategory(params.category);
		query.category = params.category;
		return await this.postService.getPosts(query);
	}


	@Post('post/:category')
	async createPost(@UserId() userId: string, @Body() body: CreatePostInputDto, @Param() params: any): Promise<object> {
		body.userId = userId;
		this.checkCategory(params.category);
		body.category = params.category
		return await this.postService.createPost(body);
	}

	@Put('update')
	async updatePost(@UserId() userId: string, @Body() body: UpdatePostInputDto): Promise<void> {
		body.userId = userId
		return await this.postService.updatePost(body);
	}

	@Delete('delete')
	async deletePost(@UserId() userId: string, @Query() query: DeletePostInputDto): Promise<void> {
		return await this.postService.deletePost(userId, query.postId);
	}

	@Get('detail')
	async getPostDetail(@UserId() userId: string, @Query() query: GetPostDetailInputDto): Promise<object> {
		return await this.postService.getPostDetail(userId, query.postId);
	}

	checkCategory(category: string) {
		if(!category || !GENERAL_BORAD_CATEGORYS.includes(category)) {
			const validateError = new ValidationError();
			validateError.property = 'category';
			validateError.value = undefined;
			validateError.constraints = {"isString": "category must be a string"}
			throw new ParameterError([validateError]);
		}
	}
}
