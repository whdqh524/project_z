import { IsString, IsOptional, MinLength, IsUUID } from 'class-validator'

export class CreateCommentInputDto {
	@IsUUID()
	readonly postId: string;

	@IsString()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}
