import { Controller, Get, Param, Query } from '@nestjs/common';
import { NoticeService } from "./notice.service";
import { GetNoticeDetailInputDto, GetNoticesInputDto } from "./dto/get.notice.dto";

@Controller('notice')
export class NoticeController {
	constructor(private readonly noticeService: NoticeService) {}

	@Get('list/:category')
	async getNotices(@Param() param: any, @Query() query: GetNoticesInputDto) : Promise<object> {
		const category = param.category || 'ALL'
		return await this.noticeService.getNotices(category, query);
	}

	@Get('detail')
	async getNoticeDetail(@Query() query: GetNoticeDetailInputDto): Promise<object> {
		return await this.noticeService.getNoticeDetail(query.postId);
	}
}
