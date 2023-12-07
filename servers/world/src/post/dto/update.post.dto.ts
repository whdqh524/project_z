import { IsString, IsOptional, MinLength, IsIn, IsUUID, IsArray, MaxLength } from 'class-validator';
import { WORLD_STATUS } from "@project_z_web_backend/common";
export class UpdatePostInputDto {
	@IsOptional()
	@IsString()
	@MinLength(2)
	readonly title: string;

	@IsOptional()
	@IsString()
	@MinLength(2)
	readonly summary: string;

	@IsOptional()
	@IsString()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@MaxLength(5)
	@IsArray()
	readonly thumbnailImageUrl: string[];

	@IsOptional()
	@IsString()
	@IsIn(WORLD_STATUS)
	readonly status: string;

	@IsUUID()
	postId: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}
