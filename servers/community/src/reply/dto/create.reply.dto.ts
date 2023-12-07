import { IsString, IsOptional, MinLength, IsUUID } from 'class-validator'

export class CreateReplyInputDto {
	@IsUUID()
	readonly postId: string;

	@IsUUID()
	readonly commentId: string;

	@IsString()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}

