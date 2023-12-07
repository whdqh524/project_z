import { Body, Query, Controller, Post, Get, Put, UseGuards } from "@nestjs/common";
import { NoticeService } from "./notice.service";
import { UserId } from "@project_z_web_backend/common";
import { CreateNoticeDto } from "./dto";
import { AuthGuard, PermissionGuard } from "../middleware";
import { GetNoticeListDto } from "./dto/get.notice.list.dto";
import { UpdateNoticeDto } from "./dto/update.notice.dto";

@UseGuards(AuthGuard,PermissionGuard)
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  async createNotice(@UserId() userId: string, @Body() inputData: CreateNoticeDto): Promise<object> {
    inputData.userId = userId;
    return await this.noticeService.createNotice(inputData);
  }

  @Get()
  async getNoticeList(@Query() inputData: GetNoticeListDto){
    return await this.noticeService.getNoticeList(inputData);
  }

  @Get('detail')
  async getNoticeDetail(@Query() inputData: any){
    return await this.noticeService.getDetail(inputData.noticeId);
  }

  @Put()
  async updateNotice(@Body() inputData: UpdateNoticeDto){
    await this.noticeService.updateNotice(inputData);
  }

}
