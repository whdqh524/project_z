import { Injectable } from '@nestjs/common';
import { WebDbConnector } from "@project_z_web_backend/common";
import { ChangeStatusDto, GetUserListDto } from "./dto";
import { Prisma } from "@project_z_web_backend/common"

@Injectable()
export class UserService {
  constructor(private readonly webDB: WebDbConnector) {
  }

  async statistics(){
    const data = await this.webDB.user.groupBy({
      by:['platform'],
      _count: {
        platform: true
      }
    })
    let totalCount = 0;
    const output = data.map((obj) => {
      const count = obj._count.platform;
      totalCount += count;
      return {
        platform: obj.platform,
        count
      }
    })
    return {
      list: output,
      totalCount
    };
  }

  async getUserList({status, nickname, email, page, limit}: GetUserListDto){
    const conditions: Prisma.UserFindManyArgs = {
      select: {
        id: true, email: true, platform: true, nickname:true,
        status: true
      },
      where: {
        status: status, nickname: nickname, email: email
      }, orderBy: {createdAt: 'desc'}, skip: (page-1)*limit, take: limit
    };

    const transactionQueries: any[] = []
    transactionQueries.push(this.webDB.user.findMany(conditions));
    transactionQueries.push(this.webDB.user.count({where:conditions.where}));
    const [ list, totalCount ] = await this.webDB.$transaction(transactionQueries);
    return { list, totalCount };
  }

  async setStatus({userId, status}: ChangeStatusDto){
    await this.webDB.user.update({where: { id: userId }, data: {status}})
  }
}
