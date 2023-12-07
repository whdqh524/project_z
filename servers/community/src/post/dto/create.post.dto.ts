import { IsString, IsOptional, MinLength, Validate, IsIn, IsUUID } from 'class-validator'
import { NotUrlValidator, GENERAL_BORAD_CATEGORYS } from "@project_z_web_backend/common";

export class CreatePostInputDto {
	@IsString()
	readonly board: string = 'GENERAL';

	@IsOptional()
	@IsString()
	@IsIn(GENERAL_BORAD_CATEGORYS)
	category: string;

	@IsString()
	@MinLength(2)
	readonly title: string;

	@IsString()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@IsString()
	@Validate(NotUrlValidator)
	readonly thumbnailImageUrl: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}