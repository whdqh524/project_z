import { Injectable } from '@nestjs/common';
import { WebDbConnector, Prisma, NoPermission, NotFoundData } from "@project_z_web_backend/common";
import { GetCommentInputDto } from "./dto/get.comment.dto";
import { UpdateCommentInputDto } from "./dto/update.comment.dto";
import { CreateCommentInputDto } from "./dto/create.comment.dto";

@Injectable()
export class CommentService {
	constructor(private readonly webDB: WebDbConnector) {}

	async getComments({postId, page, limit, userId}: GetCommentInputDto): Promise<any> {
		const conditions: Prisma.BoardCommentFindManyArgs = {
			select: {
				id: true, postId: true, content: true, replyCount: true, likeCount: true,
				status: true, createdAt: true, updatedAt: true,
				user: {select: {id:true, nickname:true, profileImageUrl:true}},
			},
			where: {postId: postId},
			orderBy: {createdAt:'asc'}, skip: (page-1)*limit,
			take: limit,
		}
		if(userId) {
			Object.assign(conditions.select, {boardLikes: {select: {id: true}, where: {userId: userId}},
				boardComplainDetails: {select: {id: true}, where: {userId: userId}}});
		}
		const comments = await this.webDB.boardComment.findMany(conditions)

		comments.map((data: any) => {
			data.likeByMe = data.boardLikes ? data.boardLikes.length > 0 : false;
			data.complainByMe = data.boardComplainDetails ? data.boardComplainDetails.length > 0 : false;
			delete data.boardLikes;
			delete data.boardComplainDetails;
			if(data.status === 'DELETED') {
				data.content = '삭제된 댓글입니다.'; // TODO: 로케일 처리 필요
			}
			return data;
		})
		return {comments: comments};
	}

	async createComment({postId, content, userId}: CreateCommentInputDto):Promise<void> {
		await this.webDB.boardComment.create({data: {postId: postId, content: content, userId: userId}});
		await this.webDB.boardPost.update({data: {commentCount: {increment: 1}}, where: {id: postId}});
	}

	async updateComment({commentId, content, userId}: UpdateCommentInputDto): Promise<void> {
		const commentModel = await this.webDB.boardComment.findUnique({where: {id: commentId}});
		if(!commentModel || commentModel.userId != userId) {
			throw new NoPermission();
		}

		await this.webDB.boardComment.update({data: {content}, where:{id: commentId}});
	}

	async deleteComment(userId: string, commentId: string): Promise<void> {
		const commentModel = await this.webDB.boardComment.findUnique({where: {id: commentId}});
		if(commentModel.status === 'DELETED') {
			throw new NotFoundData()
		}
		if(commentModel.userId !== userId ) {
			throw new NoPermission();
		}
		await this.webDB.boardComment.update({data:{status: 'DELETED'}, where: {id : commentId, status: {not: 'DELETED'}}});
	}
}
