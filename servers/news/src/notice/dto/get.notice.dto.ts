import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GetNoticesInputDto {
	@IsOptional()
	@IsString()
	readonly title: string;

	@IsOptional()
	@IsString()
	readonly content: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page: number = 1;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit: number = 10;
}
export class GetNoticeDetailInputDto {
	@IsString()
	readonly postId: string;
}