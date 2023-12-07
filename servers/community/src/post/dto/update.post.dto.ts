import { IsString, IsOptional, MinLength, Validate, IsIn, IsUUID } from 'class-validator';
import { NotUrlValidator, COMMUNITY_STATUS } from "@project_z_web_backend/common";

export class UpdatePostInputDto {
	@IsOptional()
	@IsString()
	@MinLength(2)
	readonly title: string;

	@IsOptional()
	@IsString()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@IsString()
	@Validate(NotUrlValidator)
	readonly thumbnailImageUrl: string;

	@IsOptional()
	@IsString()
	@IsIn(COMMUNITY_STATUS)
	readonly status: string;

	@IsUUID()
	postId: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}
