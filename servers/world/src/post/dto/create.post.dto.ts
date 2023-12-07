import {
	IsString,
	IsOptional,
	MinLength,
	IsIn,
	IsUUID,
	IsArray,
	ArrayMaxSize
} from 'class-validator'
import { WORLD_CATEGORY } from "@project_z_web_backend/common";

export class CreatePostInputDto {
	@IsOptional()
	@IsString()
	@IsIn(WORLD_CATEGORY)
	readonly category: string;

	@IsString()
	readonly mapGUID: string;

	@IsArray()
	readonly tag: string[] = [];

	@IsString()
	@MinLength(2)
	readonly title: string;

	@IsString()
	@MinLength(2)
	readonly summary: string;

	@IsString()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@IsArray()
	@ArrayMaxSize(5)
	readonly thumbnailImageUrl: string[];

	@IsOptional()
	@IsUUID()
	userId: string;
}