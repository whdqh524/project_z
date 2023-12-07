import { Injectable } from '@nestjs/common';
import { WebDbConnector, Prisma, NOTICE_BOARD_CATEGORIES, ParameterError } from "@project_z_web_backend/common";
import { ValidationError } from "class-validator";
import { GetNoticesInputDto } from "./dto/get.notice.dto";

@Injectable()
export class NoticeService {
	constructor(private readonly webDB: WebDbConnector) {}

	async getNotices(category: string, {title, content, page, limit}: GetNoticesInputDto) {
		this.checkCategory(category);
		const conditions: Prisma.BoardPostFindManyArgs = {
			select: {
				id: true, board: true, category: true, title:true,
				isFixed: true, assignedAt: true
			},
			where: {
				board: 'NOTICE', status: 'ALIVE', isExposed: true, assignedAt: {lte: new Date()}
			}, orderBy: {assignedAt: 'desc'}, skip: (page-1)*limit, take: limit
		};
		if(category != 'ALL') {
			Object.assign(conditions.where, {category: category})
		}
		if(title && content) {
			Object.assign(conditions.where, {OR: [{title: {search: `${title}*`}}, {content: {search: `${content}*`}}]});
		}
		else if(title && !content) {
			Object.assign(conditions.where, {title: {search: `${title}*`}});
		}
		else if(content && !title) {
			Object.assign(conditions.where, {content: {search: `${content}*`}});
		}
		const transactions = [
			this.webDB.boardPost.findMany(conditions),
			this.webDB.boardPost.count({where:conditions.where})
		]
		const [notices, count] = await this.webDB.$transaction(transactions);
		return { notices: notices, count: count};
	}

	async getNoticeDetail(postId: string): Promise<object> {
		return await this.webDB.boardPost.findUnique({
			select: {
				id: true, board: true, category: true, title:true, content: true, assignedAt: true
			},
			where:{id: postId}
		});
	}

	checkCategory(category: string) {
		if(!NOTICE_BOARD_CATEGORIES.includes(category)) {
			const validateError = new ValidationError();
			validateError.property = 'category';
			validateError.value = undefined;
			validateError.constraints = {"isString": "category must be a string"}
			throw new ParameterError([validateError]);
		}
	}
}
