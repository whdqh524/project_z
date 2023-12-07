import { Controller, Get, Query } from '@nestjs/common';
import { UpdateService } from "./update.service";
import { GetUpdateDetailInputDto, GetUpdateInputDto } from "./dto/get.update.dto";

@Controller('update')
export class UpdateController {
	constructor(private readonly updateService: UpdateService) {}

	@Get('list')
	async getUpdates(@Query() query: GetUpdateInputDto): Promise<object> {
		return this.updateService.getUpdates(query);
	}

	@Get('detail')
	async getUpdateDetail(@Query() query: GetUpdateDetailInputDto): Promise<object> {
		return this.updateService.getUpdateDetail(query.postId);
	}
}
