import { Controller, Get, Post, Patch, Body, UseGuards, Query, Delete } from '@nestjs/common';

import {CommentService} from './comment.service';
import { AuthGuard, WhiteListManager, UserId } from "@project_z_web_backend/common";
import { GetCommentInputDto } from "./dto/get.comment.dto";
import { CreateCommentInputDto } from "./dto/create.comment.dto";
import { UpdateCommentInputDto } from "./dto/update.comment.dto";
import { DeleteCommentInputDto } from "./dto/delete.comment.dto";

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
	constructor(
		private readonly commentService: CommentService,
		private readonly whtieListManager: WhiteListManager) {
		this.whtieListManager.addEndPoint(['/community/comment']);
	}

	@Get()
	async getComments(@UserId() userId: string, @Query() query: GetCommentInputDto): Promise<object> {
		if(userId) {
			query.userId = userId;
		}
		return await this.commentService.getComments(query);
	}

	@Post()
	async createComment(@UserId() userId: string, @Body() body: CreateCommentInputDto): Promise<void> {
		body.userId = userId;
		return this.commentService.createComment(body);
	}

	@Patch()
	async updateComment(@UserId() userId: string, @Body() body: UpdateCommentInputDto): Promise<void> {
		body.userId = userId;
		return this.commentService.updateComment(body);
	}

	@Delete()
	async deleteComment(@UserId() userId: string, @Query() query: DeleteCommentInputDto): Promise<void> {
		return this.commentService.deleteComment(userId, query.commentId)
	}
}
