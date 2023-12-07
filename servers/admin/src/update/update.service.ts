import { Injectable } from '@nestjs/common';
import { WebDbConnector, Prisma, NotExist } from "@project_z_web_backend/common";
import { CreateUpdateDto, GetUpdateListDto, UpdateUpdateDto } from "./dto";

@Injectable()
export class UpdateService {
  constructor(
    private readonly webDB: WebDbConnector
  ) {}

  async createUpdate(inputData: CreateUpdateDto){
    const update = await this.webDB.boardPost.create({data: inputData})
    return {updateId: update.id};
  }

  async getUpdateList({category, board, search, year, page, limit}: GetUpdateListDto) {
    const conditions: Prisma.BoardPostFindManyArgs = {
      select: {
        id: true, board: true, category: true, title:true,
        views: true, status: true, assignedAt: true,
        createdAt: true, summary: true, thumbnailImageUrl: true
      },
      where: {
        board: board, category: category
      }, orderBy: {assignedAt: 'desc'}, skip: (page-1)*limit, take: limit
    };
    if(search) {
      Object.assign(conditions.where, {OR: [{title: {search: `${search}*`}}, {content: {search: `${search}*`}}]});
    }

    if(year) Object.assign(conditions.where, {AND: [
        {  assignedAt: {gte: new Date(`${year}-01-01`)} },
        {  assignedAt: {lt: new Date(`${year + 1}-01-01`)} }
      ]
    })

    const transactionQueries: any[] = []
    transactionQueries.push(this.webDB.boardPost.findMany(conditions));
    transactionQueries.push(this.webDB.boardPost.count({where:conditions.where}));
    const [ posts, count] = await this.webDB.$transaction(transactionQueries);
    return { list: posts, totalCount: count};
  }

  async getDetail(updateId: string){
    const update: any = await this.webDB.boardPost.findUnique({
      select: {
        id: true, board: true, category: true, title:true,
        views: true, status: true, assignedAt: true,
        createdAt: true, summary: true, thumbnailImageUrl: true, content: true
      },
      where: {id: updateId}
    });
    if(!update) throw new NotExist();
    return update;
  }

  async update({updateId, summary, thumbnailImageUrl, title, content, status, assignedAt}: UpdateUpdateDto): Promise<void> {
    const dataCondition = {};
    if(assignedAt) Object.assign(dataCondition, {assignedAt: assignedAt});
    if(content) Object.assign(dataCondition,{content: content});
    if(status) Object.assign(dataCondition, {status: status});
    if(title) Object.assign(dataCondition, {title: title});
    if(summary) Object.assign(dataCondition, {summary: summary});
    if(thumbnailImageUrl) Object.assign(dataCondition, {thumbnailImageUrl: thumbnailImageUrl});

    await this.webDB.boardPost.update({where:{id: updateId}, data: dataCondition});
  }
}