import { IsString, IsOptional, MinLength, IsUUID } from 'class-validator';

export class UpdateReplyInputDto {
	@IsUUID()
	readonly replyId: string;

	@IsString()
	@MinLength(1)
	readonly content: string;

	@IsOptional()
	@IsUUID()
	userId: string;
}
