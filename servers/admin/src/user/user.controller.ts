import { Body, Controller, Get, Patch, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ChangeStatusDto, GetUserListDto } from "./dto";
import { AuthGuard, PermissionGuard } from "../middleware";

@UseGuards(AuthGuard,PermissionGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('statistics')
  async getStatistics(){
    return this.userService.statistics();
  }

  @Get()
  async getUserList(@Query() inputData: GetUserListDto) {
    return this.userService.getUserList(inputData);
  }

  @Patch()
  async changeStatus(@Body() inputData: ChangeStatusDto){
    await this.userService.setStatus(inputData);
  }
}
