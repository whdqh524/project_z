import { Body, Controller, Get, Post, Query, UseGuards, Put } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import {
  CreatePermissionGroupReqDto,
  UpdatePermissionGroupReqDto,
  JoinPermissionGroupReqDto, ResetPermissionReqDto, AssignPermissionListDto,
  AdminPermissionGroupListDto, GroupLeaveDto
} from "./dto";
import { AuthGuard, PermissionGuard } from "../middleware";
import { AdminId } from "@project_z_web_backend/common";
import { Permission } from "../decorator/permission.decorator";

@UseGuards(AuthGuard, PermissionGuard)
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService
  ) {}
  @Get()
  getPermissionCodeList(){
    return this.permissionService.getPermissionCodeList();
  }
  @Post('group')
  async createAccount(@Body() inputData: CreatePermissionGroupReqDto): Promise<any> {
    return await this.permissionService.creatGroup(inputData);
  }

  @Get('group')
  async getGroupList(): Promise<any> {
    return await this.permissionService.getGroups();
  }

  @Put('group')
  async updateAdminGroup(@Body() inputData: UpdatePermissionGroupReqDto): Promise<void> {
    await this.permissionService.updateGroup(inputData);
  }

  @Post('group/join')
  async groupJoin(@Body() inputData: JoinPermissionGroupReqDto): Promise<void> {
    await this.permissionService.joinGroup(inputData);
  }

  @Post('group/leave')
  async groupLeave(@Body() inputData: GroupLeaveDto): Promise<void> {
    await this.permissionService.leaveGroup(inputData.adminId);
  }

  @Get('group/admin')
  async getAdminListByGroupId(@Query() inputData: AdminPermissionGroupListDto): Promise<any> {
    return await this.permissionService.getAdminListByGroupId(inputData.adminPermissionGroupId);
  }

  @Post('group/assign')
  async resetPermissions(@Body() inputData: ResetPermissionReqDto): Promise<void> {
    await this.permissionService.resetPermissions(inputData);
  }

  @Get('group/assign')
  async getPermissionCodeListByGroupId(@Query() inputData: AssignPermissionListDto): Promise<any> {
    return await this.permissionService.getPermissionCodeListByGroupId(inputData.adminPermissionGroupId);
  }
}
