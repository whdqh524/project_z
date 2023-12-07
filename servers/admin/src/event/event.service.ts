import { Injectable } from '@nestjs/common';
import { WebDbConnector, InvalidDate, NotExist, Prisma } from "@project_z_web_backend/common";
import { CreateEventDto, GetEventListDto, UpdateEventDto } from "./dto";

@Injectable()
export class EventService {
  constructor(private readonly webDB: WebDbConnector) {}

  async createEvent(inputData: CreateEventDto){
    if(inputData.endDate <= inputData.startDate) throw new InvalidDate();
    const event = await this.webDB.boardPost.create({data: inputData})
    return {eventId: event.id};
  }

  async getEventList({board, category, comparison, title, content, page, limit}: GetEventListDto){
    const conditions: Prisma.BoardPostFindManyArgs = {
      select: {
        id: true, board: true, category: true, title:true,
        views: true, status: true, isExposed: true,
        createdAt: true, startDate: true, endDate: true, thumbnailImageUrl: true
      },
      where: {
        board: board, category: category
      }, orderBy: {createdAt: 'desc'}, skip: (page-1)*limit, take: limit
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

    const currentDate = new Date();
    switch (comparison){
      case 'PAST':
        Object.assign(conditions.where, {
          endDate: { lt: currentDate }
        })
        break;

      case 'PRESENT':
        Object.assign(conditions.where, {AND: [
            {  startDate: { lte: currentDate } },
            {  endDate: { gte: currentDate} }
          ]
        })
        break;

      case 'FUTURE':
        Object.assign(conditions.where, {
          startDate: { gt: currentDate }
        })
        break;
    }

    const transactionQueries: any[] = []
    transactionQueries.push(this.webDB.boardPost.findMany(conditions));
    transactionQueries.push(this.webDB.boardPost.count({where:conditions.where}));
    const [ posts, count] = await this.webDB.$transaction(transactionQueries);
    return { list: posts, totalCount: count};
  }

  async getEventDetail(eventId: string){
    const event: any = await this.webDB.boardPost.findUnique({
      select: {
        id: true, board: true, category: true, title:true,
        views: true, status: true, isExposed: true,
        createdAt: true, startDate: true, endDate: true, thumbnailImageUrl: true,
        content: true
      },
      where: {id: eventId}
    });
    if(!event) throw new NotExist();
    return event;
  }

  async updateEvent({eventId, category, startDate, endDate, title, content, isExposed, thumbnailImageUrl}: UpdateEventDto){
    const event = await this.webDB.boardPost.findUnique({where: {id: eventId}});
    if(!event) throw new NotExist();

    if(startDate && !endDate && event.endDate <= startDate) throw new InvalidDate();
    if(!startDate && endDate && endDate <= event.startDate) throw new InvalidDate();
    if(startDate && endDate && endDate <= startDate) throw new InvalidDate();

    const dataCondition = {};
    if(category) Object.assign(dataCondition, {category: category});
    if(startDate) Object.assign(dataCondition, {startDate: startDate});
    if(endDate) Object.assign(dataCondition, {endDate: endDate});
    if(typeof isExposed === "boolean") Object.assign(dataCondition, {isExposed: isExposed});
    if(content) Object.assign(dataCondition,{content: content});
    if(thumbnailImageUrl) Object.assign(dataCondition, {thumbnailImageUrl: thumbnailImageUrl});
    if(title) Object.assign(dataCondition, {title: title});

    await this.webDB.boardPost.update({where:{id: eventId}, data: dataCondition});
  }
}
