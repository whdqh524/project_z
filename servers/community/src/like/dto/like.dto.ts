import { IsString, IsOptional, IsNumber, IsUUID, IsIn } from 'class-validator'
import { Type } from "class-transformer";
import { LIKE_ENTITY_TYPE } from "@project_z_web_backend/common";

export class LikeInputDto {
	@IsString()
	@IsIn(LIKE_ENTITY_TYPE)
	readonly entityType: string;

	@IsUUID()
	readonly entityId: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page: number = 1

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit: number = 5

	@IsOptional()
	@IsUUID()
	userId: string;
}

