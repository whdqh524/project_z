import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@project_z_web_backend/common";
import { UserId } from "@project_z_web_backend/common";
import { LikeInputDto } from "./dto/like.dto";
import { LikeService } from "./like.service";

@UseGuards(AuthGuard)
@Controller('like')
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	@Get()
	async getLikes(@UserId() userId: string, @Param() param: LikeInputDto): Promise<object> {
		if(userId) {
			param.userId = userId;
		}
		return this.likeService.getLikes(param);
	}

	@Post()
	async createOrDeleteLike(@UserId() userId: string, @Body() body: LikeInputDto): Promise<object> {
		body.userId = userId;
		return await this.likeService.createOrDeleteLike(body);
	}

}