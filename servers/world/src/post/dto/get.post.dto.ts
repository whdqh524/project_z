import { IsNumber, IsString, IsOptional, IsUUID, IsIn } from 'class-validator'
import { Type } from 'class-transformer';
import {
	WORLD_CATEGORY, WORLD_SELECT,
	WORLD_SORT
} from "@project_z_web_backend/common";

export class GetPostInputDto {
	@IsString()
	@IsIn(WORLD_CATEGORY)
	readonly category: string = 'ALL';

	@IsOptional()
	@IsString()
	@IsIn(WORLD_SORT)
	sort: string = 'NEW';

	@IsOptional()
	@IsString()
	@IsIn(WORLD_SELECT)
	readonly select: string;

	@IsOptional()
	@IsString()
	readonly search: string;

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