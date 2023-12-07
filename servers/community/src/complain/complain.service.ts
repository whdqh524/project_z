import { Injectable } from '@nestjs/common';
import { WebDbConnector, AlreadyExist, EntityNotMatch, NotExist } from "@project_z_web_backend/common";
import { CreateComplainInputDto } from "./dto/create.complain.dto";

@Injectable()
export class ComplainService {
	constructor(private readonly webDB: WebDbConnector) {}

	async createComplain({entityType, entityId, reason, content, userId}: CreateComplainInputDto): Promise<void> {
		switch (entityType) {
			case 'POST':
				return await this.createPostComplain(entityType, entityId, reason, content, userId);
			case 'COMMENT':
				return await this.createCommentComplain(entityType, entityId, reason, content, userId);
			case 'REPLY':
				return await this.createReplyComplain(entityType, entityId, reason, content, userId);
			default:
				throw new EntityNotMatch()
		}
	}

	async createPostComplain(entityType: string, postId: string, reason: string, content: string, userId: string): Promise<void> {
		const entityModel = await this.webDB.boardPost.findUnique({where:{id: postId}});
		if(!entityModel) {
			throw new NotExist();
		}
		let complainModel = await this.webDB.boardComplain.findFirst({where: {entityType: 'Post', entityId:postId}});
		if(!complainModel) {
			complainModel = await this.webDB.boardComplain.create({data: {entityType: entityType, entityId: postId, postId: postId}})
				.catch(async() =>{
				// TODO: 듀플리케이트 에러인 경우에는 다시 찾아서 리턴하는 로직으로 수정
				return await this.webDB.boardComplain.findFirst({where: {entityType, entityId: postId}})
			});
		}
		await this.webDB.boardComplainDetail.create({data: {userId, postId, reason, content, boardComplainId: complainModel.id}})
			.catch(() => {throw new AlreadyExist()});
	}

	async createCommentComplain(entityType: string, commentId: string, reason: string, content: string, userId: string): Promise<void> {
		const entityModel = await this.webDB.boardComment.findUnique({where:{id: commentId}});
		if(!entityModel) {
			throw new NotExist();
		}
		let complainModel = await this.webDB.boardComplain.findFirst({where: {entityType: 'Comment', entityId:commentId}});
		if(!complainModel) {
			complainModel = await this.webDB.boardComplain.create({data: {entityType: entityType, entityId: commentId, commentId: commentId}})
				.catch(async() =>{
				// TODO: 듀플리케이트 에러인 경우에는 다시 찾아서 리턴하는 로직으로 수정
				return await this.webDB.boardComplain.findFirst({where: {entityType, entityId: commentId}})
			});
		}
		await this.webDB.boardComplainDetail.create({data: {userId, commentId, reason, content, boardComplainId: complainModel.id}})
			.catch(() => {throw new AlreadyExist()});
	}

	async createReplyComplain(entityType: string, replyId: string, reason: string, content: string, userId: string): Promise<void> {
		const entityModel = await this.webDB.boardReply.findUnique({where:{id: replyId}});
		if(!entityModel) {
			throw new NotExist();
		}
		let complainModel = await this.webDB.boardComplain.findFirst({where: {entityType: 'Reply', entityId:replyId}});
		if(!complainModel) {
			complainModel = await this.webDB.boardComplain.create({data: {entityType: entityType, entityId: replyId, replyId: replyId}})
				.catch(async() =>{
				// TODO: 듀플리케이트 에러인 경우에는 다시 찾아서 리턴하는 로직으로 수정
				return await this.webDB.boardComplain.findFirst({where: {entityType, entityId: replyId}})
			});
		}
		await this.webDB.boardComplainDetail.create({data: {userId, replyId, reason, content, boardComplainId: complainModel.id}})
			.catch(() => {throw new AlreadyExist()});
	}
}
