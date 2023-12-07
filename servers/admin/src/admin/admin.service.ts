import { Injectable } from '@nestjs/common';
import {
  WebDbConnector, RedisManager,
  randomString, generateSalt, encryptPassword,
  InvalidNickname,
  AccountIdAlreadyExist,
  NicknameAlreadyExist,
  NotExist, InvalidPassword, Prisma, User, AdminUser
} from "@project_z_web_backend/common";

import {
  CreateAccountReqDto,
  SignInAccountReqDto,
  GetAdminListReqDto, UpdateAccountDto
} from "./dto";

@Injectable()
export class AdminService {
  constructor(
    private readonly webDB: WebDbConnector,
    private readonly redisManager: RedisManager
  ) {}

  async createAccount({accountId, nickname, adminPermissionGroupId, name, password, department}: CreateAccountReqDto) {
    const userData: Prisma.UserCreateInput = {
      platform: 0,
      oauthId: randomString(),
      nickname: nickname
    }
    await this.webDB.$transaction(async (tx) => {
      const adminUser: AdminUser = await this.webDB.adminUser.findUnique({where: { accountId }});
      if(adminUser) throw new AccountIdAlreadyExist();
      if(await this.checkNicknameExist(nickname)) throw new NicknameAlreadyExist();

      const user: User = await tx.user.create({data : <Prisma.UserCreateInput>userData});
      const salt = generateSalt();
      const hashedPassword = encryptPassword(password, salt);
      await tx.adminUser.create({data: <Prisma.AdminUserUncheckedCreateInput>{
          accountId,
          name,
          password: hashedPassword,
          department,
          adminPermissionGroupId,
          userId: user.id,
          salt
        }});
    })
  }

  async updateAccount({adminId, department, adminPermissionGroupId, name, nickname, password}: UpdateAccountDto){
    const adminUser: AdminUser = await this.webDB.adminUser.findUnique({where: { id: adminId }});
    if(!adminUser) throw new NotExist();

    const data: any = {
      department,
      name,
      adminPermissionGroupId
    };

    if(password){
      const salt = generateSalt();
      data.password = encryptPassword(password, salt);
      data.salt = salt;
    }

    await this.webDB.$transaction(async (tx) => {
      if(nickname){
        if(await this.checkNicknameExist(nickname)) throw new NicknameAlreadyExist();
        await tx.user.update({where: {id: adminUser.userId}, data : {nickname}});
      }
      await tx.adminUser.update({where: {id: adminId}, data});
    })
  }

  async signIn({accountId, password}: SignInAccountReqDto): Promise<string>{
    const adminUser: AdminUser =  await this.findByAccountId(accountId);
    if(!adminUser) throw new NotExist();

    const isValid: boolean = this.validatePassword(adminUser.password, password, adminUser.salt);
    if(!isValid) throw new InvalidPassword();

    await this.webDB.adminUser.update({where: {id: adminUser.id}, data: {accessedAt: new Date()}});
    const token: string = randomString();
    await this.redisManager.setAdminSession(adminUser, token);
    return token;
  }

  validatePassword(hashedPassword: string, password: string, salt: string){
    return encryptPassword(password, salt) === hashedPassword;
  }

  async getAdminList({page, limit}:GetAdminListReqDto): Promise<Object>{
    const count = await this.webDB.adminUser.count();
    const adminUserList = await this.webDB.adminUser.findMany({
      select: {
        id: true,
        accountId: true,
        name: true,
        adminPermissionGroup: {select: {id:true, name:true}},
        user: {select: {nickname: true}},
        department: true,
        accessedAt: true
      },
      orderBy: {}, skip: (page-1) * limit, take: limit
    });
    const list = adminUserList.map((adminUser) => {
      const result = Object.assign(adminUser);
      result.nickname = adminUser.user.nickname;
      delete result.user;
      return result;
    })
    return { list, totalCount: count }
  }

  async getMyInfo(adminId: string): Promise<Object> {
    const adminUser = await this.webDB.adminUser.findUnique({
      select:{
        id: true,
        accountId: true,
        name: true,
        department: true,
        adminPermissionGroup: {select: {id:true, name:true}},
        user: {select: {nickname: true}},
        accessedAt: true
      },
      where: {id: adminId}
    });

    const result = Object.assign(adminUser);
    result.nickname = adminUser.user.nickname;
    delete result.user;
    return result;
  }

  async findByAccountId(accountId: string): Promise<AdminUser>{
    return this.webDB.adminUser.findUnique({where: { accountId }});
  }
  async checkNicknameExist(nickname: string): Promise<boolean> {
    if(!this.validNickname(nickname)) {
      throw new InvalidNickname();
    }
    const user: User = await this.webDB.user.findUnique({where:{nickname:nickname}});
    return !!user;
  }

  validNickname (nickname:string):boolean {
    return /^[가-힣A-Za-z0-9-]{1,10}$/.test(nickname)
  }
}
