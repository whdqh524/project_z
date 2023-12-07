import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard, UserId } from "@project_z_web_backend/common";
import { ReplyService } from "./reply.service";
import { GetRepliesInputDto } from "./dto/get.replies.dto";
import { CreateReplyInputDto } from "./dto/create.reply.dto";
import { UpdateReplyInputDto } from "./dto/update.reply.dto";
import { DeleteReplyInputDto } from "./dto/delete.reply.dto";

@UseGuards(AuthGuard)
@Controller('reply')
export class ReplyController {
	constructor(private readonly replyService: ReplyService) {}

	@Get()
	async getReplies(@UserId() userId: string, @Query() query: GetRepliesInputDto): Promise<object> {
		if(userId) {
			query.userId = userId;
		}
		return await this.replyService.getReplies(query);
	}

	@Post()
	async createReply(@UserId() userId: string, @Body() body: CreateReplyInputDto): Promise<void> {
		body.userId = userId;
		return await this.replyService.createReply(body);
	}

	@Patch()
	async updateReply(@UserId() userId: string, @Body() body: UpdateReplyInputDto): Promise<void> {
		body.userId = userId;
		return await this.replyService.updateReply(body);
	}

	@Delete()
	async deleteReply(@UserId() userId: string, @Query() query: DeleteReplyInputDto): Promise<void> {
		return await this.replyService.deleteReply(userId, query.replyId);
	}

}
