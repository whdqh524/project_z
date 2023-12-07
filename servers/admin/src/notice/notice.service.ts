import { Injectable } from '@nestjs/common';
import { WebDbConnector, Prisma, NotExist } from "@project_z_web_backend/common";
import { CreateNoticeDto } from "./dto";
import { GetNoticeListDto } from "./dto/get.notice.list.dto";
import { UpdateNoticeDto } from "./dto/update.notice.dto";

@Injectable()
export class NoticeService {
  constructor(
    private readonly webDB: WebDbConnector
  ) {}

  async createNotice(inputData: CreateNoticeDto): Promise<object>{
    const notice = await this.webDB.boardPost.create({data: inputData})
    return {noticeId: notice.id};
  }

  async getNoticeList({category, board, title, content, page, limit}: GetNoticeListDto) {
    const conditions: Prisma.BoardPostFindManyArgs = {
      select: {
        id: true, board: true, category: true, title:true,
        views: true, status: true, isExposed: true,  assignedAt: true,
        isFixed: true, createdAt: true
      },
      where: {
        board: board, category: category
      }, orderBy: {createdAt: 'desc'}, skip: (page-1)*limit, take: limit
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

    let fixedPosts: any[] = [];
    if(page-1==0) {
      fixedPosts = await this.webDB.boardPost.findMany({
        select: conditions.select,
        where:{board: board, category: category, isFixed:true},
        orderBy: {createdAt:'desc'}
      });
    }
    const transactionQueries: any[] = []
    transactionQueries.push(this.webDB.boardPost.findMany(conditions));
    transactionQueries.push(this.webDB.boardPost.count({where:conditions.where}));
    const [ posts, count] = await this.webDB.$transaction(transactionQueries);
    const resultData = fixedPosts.concat(posts);
    return { list: resultData, totalCount: count};
  }

  async getDetail(noticeId: string){
    const notice: any = await this.webDB.boardPost.findUnique({
      select: {
        id: true, board: true, category: true, title:true,
        content: true, views: true, isFixed: true, isExposed: true,
        status: true, createdAt: true, updatedAt: true, assignedAt: true
      },
      where: {id: noticeId}
    });
    if(!notice) throw new NotExist();
    return notice;
  }

  async updateNotice({noticeId, category, title, content, status, isFixed, isExposed, assignedAt}: UpdateNoticeDto): Promise<void> {
    const dataCondition = {};
    if(category) Object.assign(dataCondition, {category: category});
    if(assignedAt) Object.assign(dataCondition, {assignedAt: assignedAt});
    if(typeof isFixed === "boolean") Object.assign(dataCondition, {isFixed: isFixed});
    if(typeof isExposed === "boolean") Object.assign(dataCondition, {isExposed: isExposed});
    if(content) Object.assign(dataCondition,{content: content});
    if(status) Object.assign(dataCondition, {status: status});
    if(title) Object.assign(dataCondition, {title: title});

    await this.webDB.boardPost.update({where:{id: noticeId}, data: dataCondition});
  }
}
