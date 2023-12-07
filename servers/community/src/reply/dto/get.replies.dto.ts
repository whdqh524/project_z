import { IsNumber, IsOptional, IsUUID } from 'class-validator'
import { Type } from 'class-transformer';

export class GetRepliesInputDto {
	@IsUUID()
	readonly commentId: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page: number = 1;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit: number = 10;

	@IsOptional()
	@IsUUID()
	userId: string;
}

