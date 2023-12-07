import { Injectable } from '@nestjs/common';
import { WebDbConnector, Prisma, EVENT_BOARD_CATEGORIES, ParameterError } from "@project_z_web_backend/common";
import { GetEventsInputDto } from "./dto/get.event.dto";
import { ValidationError } from "class-validator";

@Injectable()
export class EventService {
	constructor(private readonly webDB: WebDbConnector) {}

	async getEvents(category: string, {isOpen, title, content, page, limit}: GetEventsInputDto): Promise<object> {
		this.checkCategory(category);
		const now = new Date();
		const conditions: Prisma.BoardPostFindManyArgs = {
			select: {
				id: true, board: true, category: true, title:true, thumbnailImageUrl: true, startDate: true, endDate: true,
				isFixed: true
			},
			where: {
				board: 'EVENT', isExposed: true, status: 'ALIVE', assignedAt: {lte: now}
			}, orderBy: {assignedAt: 'desc'}, skip: (page-1)*limit, take: limit
		};
		if(title && content) {
			Object.assign(conditions.where, {OR: [{title: {search: `${title}*`}}, {content: {search: `${content}*`}}]});
		}
		else if(title && !content) {
			Object.assign(conditions.where, {title: {search: `${title}*`}});
		}
		else if(content && !title) {
			Object.assign(conditions.where, {content: {search: `${content}*`}});
		}
		if(isOpen) {
			Object.assign(conditions.where, {startDate: {lte: now}, endDate: {gt:now}});
		}
		else {
			Object.assign(conditions.where, {endDate: {lt: now}});
		}
		const transactions = [
			this.webDB.boardPost.findMany(conditions),
			this.webDB.boardPost.count({where:conditions.where})
		]
		const [events, count] = await this.webDB.$transaction(transactions);
		return { events: events, count: count};
	}

	async getEventDetail(postId: string): Promise<object> {
		return await this.webDB.boardPost.findUnique({
			select: {
				id: true, board: true, category: true, title:true, content: true, startDate: true, endDate: true,
			},
			where:{id: postId}
		});
	}

	checkCategory(category: string) {
		if(!EVENT_BOARD_CATEGORIES.includes(category)) {
			const validateError = new ValidationError();
			validateError.property = 'category';
			validateError.value = undefined;
			validateError.constraints = {"isString": "category must be a string"}
			throw new ParameterError([validateError]);
		}
	}
}
