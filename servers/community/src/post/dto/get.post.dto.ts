import { IsNumber, IsString, IsOptional, IsUUID, IsIn } from 'class-validator'
import { Type } from 'class-transformer';
import { COMMUNITY_SORT, GENERAL_BORAD_CATEGORYS } from "@project_z_web_backend/common";

export class GetPostInputDto {
	@IsString()
	readonly  board: string = 'GENERAL';

	@IsOptional()
	@IsString()
	@IsIn(GENERAL_BORAD_CATEGORYS)
	category: string;

	@IsOptional()
	@IsString()
	@IsIn(COMMUNITY_SORT)
	sort: string = 'NEW';

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

	@IsOptional()
	@IsUUID()
	userId: string;
}

export class GetPostDetailInputDto {
	@IsUUID()
	readonly postId: string;
}