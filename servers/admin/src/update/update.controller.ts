import { UpdateService } from "./update.service";
import { Body, Query, Controller, Post, Get, Put, UseGuards } from "@nestjs/common";
import { UserId } from "@project_z_web_backend/common";
import { CreateUpdateDto, GetUpdateListDto, UpdateUpdateDto } from "./dto";
import { AuthGuard, PermissionGuard } from "../middleware";

@UseGuards(AuthGuard,PermissionGuard)
@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Post()
  async createUpdate(@UserId() userId: string, @Body() inputData: CreateUpdateDto){
    inputData.userId = userId;
    return await this.updateService.createUpdate(inputData);
  }

  @Get()
  async getUpdateList(@Query() inputData: GetUpdateListDto){
    return await this.updateService.getUpdateList(inputData);
  }

  @Get('detail')
  async getUpdateDetail(@Query() inputData: any){
    return await this.updateService.getDetail(inputData.updateId);
  }

  @Put()
  async update(@Body() inputData: UpdateUpdateDto){
    await this.updateService.update(inputData);
  }
}
