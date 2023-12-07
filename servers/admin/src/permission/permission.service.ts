import { Injectable } from '@nestjs/common';
import { WebDbConnector } from "@project_z_web_backend/common";
import {
  CreatePermissionGroupReqDto, JoinPermissionGroupReqDto, ResetPermissionReqDto,
  UpdatePermissionGroupReqDto
} from "./dto";
import {
  AlreadyExist, NotExist,
  PermissionNotFound
} from "@project_z_web_backend/common";
import {
  Prisma,
} from "@project_z_web_backend/common";
import {
  PERMISSION_CODE
} from "@project_z_web_backend/common";
@Injectable()
export class PermissionService {
  constructor(
    private readonly webDB: WebDbConnector
  ) {}

  async creatGroup({name}: CreatePermissionGroupReqDto){
    const adminGroup = await this.webDB.adminPermissionGroup.findUnique({where : {name}});
    if(adminGroup) throw new AlreadyExist();
    const createdAdminGroup = await this.webDB.adminPermissionGroup.create({data: <Prisma.AdminPermissionGroupCreateInput>{name}});
    return {adminPermissionGroupId: createdAdminGroup.id};
  }

  async getGroups(){
    const groupList = await this.webDB.adminPermissionGroup.findMany();
    return {list:groupList};
  }

  async updateGroup({adminPermissionGroupId, name}: UpdatePermissionGroupReqDto){
    const adminGroup = await this.webDB.adminPermissionGroup.findUnique({where : {name}});
    if(adminGroup) throw new AlreadyExist();
    await this.webDB.adminPermissionGroup.update({where: {id: adminPermissionGroupId}, data: {name}});
  }

  async joinGroup({adminId, adminPermissionGroupId}: JoinPermissionGroupReqDto){
    const adminUser = await this.webDB.adminUser.findUnique({where: {id:adminId}});
    if(adminUser.adminPermissionGroupId) throw new AlreadyExist();
    await this.webDB.adminUser.update({where: {id: adminId}, data: {adminPermissionGroupId: adminPermissionGroupId}});
  }

  async leaveGroup(adminId: string){
    const adminUser = await this.webDB.adminUser.findUnique({where:{id: adminId}})
    if(!adminUser) throw new NotExist();

    await this.webDB.adminUser.update({where: {id: adminId}, data: {adminPermissionGroupId: null}});
  }

  async getAdminListByGroupId(adminPermissionGroupId: string) {
    const adminPermissionGroup = await this.webDB.adminPermissionGroup.findUnique({where:{id:adminPermissionGroupId}});
    if(!adminPermissionGroup) throw new NotExist();

    const list = await this.webDB.adminUser.findMany({
      where:{
        adminPermissionGroupId
      },
      select: {
        id: true,
        accountId: true,
        name: true,
        adminPermissionGroup: {select: {id:true, name:true}},
        department: true,
        accessedAt: true
      }
    });
    return { list }
  }

  async resetPermissions({adminPermissionGroupId, permissions}: ResetPermissionReqDto){
    const adminPermissionGroup = await this.webDB.adminPermissionGroup.findUnique({where:{id:adminPermissionGroupId}});
    if(!adminPermissionGroup) throw new NotExist();

    const insertDataList = [];
    for(const permission of permissions){
      if(!PERMISSION_CODE.includes(permission.code)) throw new PermissionNotFound();
      insertDataList.push({
        adminPermissionGroupId,
        code: permission.code,
        canEdit: permission.canEdit
      })
    }
    await this.webDB.adminPermission.deleteMany({where: {adminPermissionGroupId}});
    await this.webDB.adminPermission.createMany({
      data: insertDataList,
      skipDuplicates: true
    })
  }

  async getPermissionCodeListByGroupId(adminPermissionGroupId: string){
    const adminPermissionGroup = await this.webDB.adminPermissionGroup.findUnique({where:{id:adminPermissionGroupId}});
    if(!adminPermissionGroup) throw new NotExist();

    const list = await this.webDB.adminPermission.findMany({where: { adminPermissionGroupId }})
    return {list}
  }

  getPermissionCodeList(){
    return PERMISSION_CODE
  }
}
