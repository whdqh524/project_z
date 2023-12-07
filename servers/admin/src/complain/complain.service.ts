import { Injectable } from '@nestjs/common';
import { WebDbConnector, Prisma } from "@project_z_web_backend/common";
import { ComplainListDto } from './dto'

@Injectable()
export class ComplainService {
  // constructor(private readonly webDB: WebDbConnector) {}

  async complainList({page, limit}: ComplainListDto){
    // await this.webDB.boardComplain.findMany({
    //   select:
    // })
    // const conditions: Prisma.BoardComplainFindManyArgs = {
    //   select: {
    //     id: true, entityType: true, platform: true, nickname:true,
    //     status: true
    //   },
    //   where: {
    //     status: status, nickname: nickname, email: email
    //   }, orderBy: {createdAt: 'desc'}, skip: (page-1)*limit, take: limit
    // };
    //
    // const transactionQueries: any[] = []
    // transactionQueries.push(this.webDB.user.findMany(conditions));
    // transactionQueries.push(this.webDB.user.count({where:conditions.where}));
    // const [ list, totalCount ] = await this.webDB.$transaction(transactionQueries);
    // return { list, totalCount };
  }
}
