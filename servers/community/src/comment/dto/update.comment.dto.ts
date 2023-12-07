import { IsOptional, MinLength, IsUUID } from 'class-validator';

export class UpdateCommentInputDto {
	@IsUUID()
	readonly commentId: string;

	@IsOptional()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}
