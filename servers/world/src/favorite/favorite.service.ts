import { Injectable } from '@nestjs/common';
import { WebDbConnector } from "@project_z_web_backend/common";
import { FavoriteInputDto } from "./dto/favorite.dto";

@Injectable()
export class FavoriteService {
	constructor(private readonly webDB: WebDbConnector) {}

	async createOrDeleteFavorite({userId, postId}: FavoriteInputDto): Promise<object> {
		let result: boolean = true;
		await this.webDB.worldFavorite.create({data: {userId, postId,}}).catch(async (err) => {
			await this.webDB.worldFavorite.delete({where: {userId_postId: {userId, postId}}});
			result = false;
		})
		return {favoriteByMe: result};
	}
}
