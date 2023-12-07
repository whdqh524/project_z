import { IsOptional, IsUUID } from "class-validator";

export class FavoriteInputDto {
	@IsUUID()
	readonly postId: string

	@IsOptional()
	@IsUUID()
	userId: string;
}