import { Controller, Post, Get, Body, Query, UseGuards, Put } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAccountReqDto, GetAdminListReqDto, SignInAccountReqDto, UpdateAccountDto } from "./dto";
import { AdminId, WhiteListManager } from "@project_z_web_backend/common";
import { Permission } from "../decorator/permission.decorator";
import { AuthGuard, PermissionGuard } from "../middleware";

@UseGuards(AuthGuard,PermissionGuard)
@Controller('adminUser')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly whiteListManager: WhiteListManager
  ) {
    this.whiteListManager.addEndPoint(['/admin/adminUser/signIn']);
  }

  @Post()
  @Permission({code:'ADMIN', canEdit: true})
  async createAccount(@Body() createAccountData: CreateAccountReqDto): Promise<void> {
    await this.adminService.createAccount(createAccountData);
  }

  @Post('signIn')
  async signIn(@Body() inputData: SignInAccountReqDto): Promise<string> {
    return await this.adminService.signIn(inputData);
  }

  @Get()
  async getAdminList(@Query() inputData: GetAdminListReqDto): Promise<object> {
    return await this.adminService.getAdminList(inputData);
  }

  @Get('myInfo')
  async getMyInfo(@AdminId() adminId: string): Promise<object> {
    return await this.adminService.getMyInfo(adminId);
  }

  @Put()
  async updateAdminUser(@Body() inputData: UpdateAccountDto){
    await this.adminService.updateAccount(inputData);
  }
}
