import { Injectable } from '@nestjs/common';
import { WebDbConnector, Prisma, NoPermission, NotFoundData } from "@project_z_web_backend/common";
import { GetRepliesInputDto } from "./dto/get.replies.dto";
import { CreateReplyInputDto } from "./dto/create.reply.dto";
import { UpdateReplyInputDto } from "./dto/update.reply.dto";

@Injectable()
export class ReplyService {
	constructor(private readonly webDB: WebDbConnector) {}

	async getReplies({commentId, page, limit, userId}: GetRepliesInputDto): Promise<object> {
		const conditions: Prisma.BoardReplyFindManyArgs = {
			select: {
				id: true, postId: true, commentId: true, content: true, likeCount: true,
				status: true, createdAt: true, updatedAt: true,
				user: {select: {id:true, nickname:true, profileImageUrl:true}},
			},
			where: {commentId: commentId},
			orderBy: {createdAt:'asc'}, skip: (page-1)*limit,
			take: limit,
		}
		if(userId) {
			Object.assign(conditions.select, {boardLikes: {select: {id: true}, where: {userId: userId}},
				boardComplainDetails: {select: {id: true}, where: {userId: userId}}});
		}
		const replies = await this.webDB.boardReply.findMany(conditions)

		replies.map((data: any) => {
			data.likeByMe = data.boardLikes ? data.boardLikes.length > 0 : false;
			data.complainByMe = data.boardComplainDetails ? data.boardComplainDetails.length > 0 : false;
			delete data.boardLikes;
			delete data.boardComplainDetails;
			if(data.status === 'DELETED') {
				data.content = '삭제된 덧글입니다.' // TODO: 로케일 필요
			}
			return data;
		})
		return {replies: replies};
	}

	async createReply({postId, commentId, content, userId}: CreateReplyInputDto):Promise<void> {
		await this.webDB.$transaction([
			this.webDB.boardReply.create({data: {postId: postId, commentId: commentId, content: content, userId: userId}}),
			this.webDB.boardComment.update({data: {replyCount: {increment: 1}}, where: {id: commentId}}),
			this.webDB.boardPost.update({data: {commentCount: {increment:1}}, where: {id: postId}})
		]);
	}

	async updateReply({replyId, content, userId}: UpdateReplyInputDto): Promise<void> {
		const replyModel = await this.webDB.boardReply.findUnique({where: {id: replyId}});
		if(!replyModel || replyModel.userId != userId) {
			throw new NoPermission();
		}
		await this.webDB.boardReply.update({data: {content}, where:{id: replyId}});
	}

	async deleteReply(userId: string, replyId: string): Promise<void> {
		const replyModel = await this.webDB.boardReply.findUnique({where: {id: replyId}});
		if(replyModel.userId !== userId) {
			throw new NoPermission();
		}
		if(replyModel.status === 'DELETED') {
			throw new NotFoundData()
		}
		await this.webDB.boardReply.update({data:{status: 'DELETED'}, where: {id : replyId}});
	}
}
