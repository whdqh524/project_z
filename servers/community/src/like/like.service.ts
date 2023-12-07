import { Injectable } from '@nestjs/common';
import { WebDbConnector, EntityNotMatch } from "@project_z_web_backend/common";
import { LikeInputDto } from "./dto/like.dto";

@Injectable()
export class LikeService {
	constructor(private readonly webDB: WebDbConnector) {}

	async getLikes({entityType, entityId, page, limit}: LikeInputDto): Promise<object> {
		const likes = await this.webDB.boardLike.findMany(
			{where: {entityId, entityType}, skip:page-1, take: limit});
		return {likes: likes}
	}

	async createOrDeleteLike({entityType, entityId, userId}: LikeInputDto): Promise<object> {
		switch (entityType) {
			case 'POST':
				return await this.likePost(entityType, entityId, userId);
			case 'COMMENT':
				return await this.likeComment(entityType, entityId, userId);
			case 'REPLY':
				return await this.likeReply(entityType, entityId, userId);
			default:
				throw new EntityNotMatch();
		}
	}

	async likePost(entityType: string, postId: string, userId: string): Promise<object> {
		let result = true;
		const transactions = [
			this.webDB.boardLike.create({data: {userId, postId, entityType, entityId: postId}}),
			this.webDB.boardPost.update({data: {likeCount: {increment: 1}}, where:{id: postId}})
		];
		await this.webDB.$transaction(transactions).catch(async () => {
			const failedTransactions = [
				this.webDB.boardLike.delete({where: {userId_entityId: {userId, entityId: postId}}}),
				this.webDB.boardPost.update({data: {likeCount: {decrement: 1}}, where: {id: postId}})
			]
			await this.webDB.$transaction(failedTransactions);
		});
		return {likeByMe: result};
	}

	async likeComment(entityType: string, commentId: string, userId: string): Promise<object> {
		let result: boolean = true;
		const transactions = [
			this.webDB.boardLike.create({data: {userId, commentId, entityType, entityId: commentId}}),
			this.webDB.boardComment.update({data: {likeCount: {increment: 1}}, where:{id: commentId}})
		];
		await this.webDB.$transaction(transactions).catch(async () => {
			const failedTransactions = [
				this.webDB.boardLike.delete({where: {userId_entityId: {userId, entityId: commentId}}}),
				this.webDB.boardComment.update({data: {likeCount: {decrement: 1}}, where: {id: commentId}})
			]
			await this.webDB.$transaction(failedTransactions);
		});
		return {likeByMe: result};
	}

	async likeReply(entityType: string, replyId: string, userId: string): Promise<object> {
		let result: boolean = true;
		const transactions = [
			this.webDB.boardLike.create({data: {userId, replyId, entityType, entityId: replyId}}),
			this.webDB.boardReply.update({data: {likeCount: {increment: 1}}, where:{id: replyId}})
		];
		await this.webDB.$transaction(transactions).catch(async () => {
			const failedTransactions = [
				this.webDB.boardLike.delete({where: {userId_entityId: {userId, entityId: replyId}}}),
				this.webDB.boardReply.update({data: {likeCount: {decrement: 1}}, where: {id: replyId}})
			]
			await this.webDB.$transaction(failedTransactions);
		});
		return {likeByMe: result};
	}
}
