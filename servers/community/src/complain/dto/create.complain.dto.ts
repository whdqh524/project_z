import { IsIn, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { LIKE_ENTITY_TYPE, COMPLAIN_REASON } from "@project_z_web_backend/common";

export class CreateComplainInputDto {
	@IsString()
	@IsIn(LIKE_ENTITY_TYPE)
	readonly entityType: string;

	@IsUUID()
	readonly entityId: string;

	@IsString()
	@IsIn(COMPLAIN_REASON)
	readonly reason: string;

	@IsString()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}