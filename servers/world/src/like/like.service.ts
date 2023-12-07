import { Injectable } from '@nestjs/common';
import { WebDbConnector } from "@project_z_web_backend/common";
import { LikeInputDto } from "./dto/like.dto";
import { WorldLike } from "@project_z_web_backend/common"

@Injectable()
export class LikeService {
	constructor(private readonly webDB: WebDbConnector) {}

	async getLikes({entityType, entityId, page, limit}: LikeInputDto): Promise<object> {
		const likes: WorldLike[] = await this.webDB.worldLike.findMany(
			{where: {entityId, entityType}, skip:page-1, take: limit});
		return {likes: likes}
	}

	async createOrDeleteLike({entityType, entityId, userId}: LikeInputDto): Promise<object> {
		let result: boolean = true;
		const transactions = [
			this.webDB.worldLike.create({data: {userId, postId: entityId, entityType, entityId: entityId}}),
			this.webDB.worldPost.update({data: {likeCount: {increment: 1}}, where:{id: entityId}})
		];
		await this.webDB.$transaction(transactions).catch(async () => {
			const failedTransactions = [
				this.webDB.worldLike.delete({where: {userId_entityId: {userId, entityId}}}),
				this.webDB.worldPost.update({data: {likeCount: {decrement: 1}}, where: {id: entityId}})
			]
			await this.webDB.$transaction(failedTransactions);
		});
		return {likeByMe: result};
	}
}
