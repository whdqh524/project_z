import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FavoriteService } from "./favorite.service";
import { FavoriteInputDto } from "./dto/favorite.dto";
import { UserId } from "@project_z_web_backend/common";
import { AuthGuard } from "@project_z_web_backend/common";

@UseGuards(AuthGuard)
@Controller('favorite')
export class FavoriteController {
	constructor(private readonly favoriteService: FavoriteService) {}

	@Post()
	async createOrDeleteFavorite(@UserId() userId: string, @Body() body: FavoriteInputDto): Promise<object> {
		body.userId = userId;
		return await this.favoriteService.createOrDeleteFavorite(body);
	}
}
