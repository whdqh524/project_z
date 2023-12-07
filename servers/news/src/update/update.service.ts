import { Injectable } from '@nestjs/common';
import { WebDbConnector, Prisma } from "@project_z_web_backend/common";
import { GetUpdateInputDto } from "./dto/get.update.dto";

@Injectable()
export class UpdateService {
	constructor(private readonly webDB: WebDbConnector) {}

	async getUpdates({year, search, page, limit}: GetUpdateInputDto): Promise<object> {
		const conditions: Prisma.BoardPostFindManyArgs = {
			select: {
				id: true, board: true, title:true, summary:true, thumbnailImageUrl: true, isFixed: true, assignedAt: true
			},
			where: {
				board: 'UPDATE', status: 'ALIVE', isExposed: true
			}, orderBy: {assignedAt: 'desc'}, skip: (page-1)*limit, take: limit
		};
		if(year) {
			const startDate = new Date(`${year}-01-01T00:00:00.000Z` )
			const endDate = new Date(`${year+1}-01-01T00:00:00.000Z`)
			Object.assign(conditions.where, {assignedAt: {gte: startDate, lte: endDate}});
		}
		if(search) {
			Object.assign(conditions.where, {OR: [{title: {search: `${search}*`}}, {content: {search: `${search}*`}}]});
		}
		const transactions = [
			this.webDB.boardPost.findMany(conditions),
			this.webDB.boardPost.count({where:conditions.where})
		]
		const [updates, count] = await this.webDB.$transaction(transactions);
		return { updates: updates, count: count};
	}

	async getUpdateDetail(postId: string): Promise<object> {
		return await this.webDB.boardPost.findUnique({
			select: {
				id: true, board: true, title:true, summary: true, content: true, assignedAt: true,
			},
			where:{id: postId}
		});
	}
}
