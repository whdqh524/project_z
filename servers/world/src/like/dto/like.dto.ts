import { IsOptional, IsNumber, IsUUID, IsString } from 'class-validator'
import { Type } from "class-transformer";

export class LikeInputDto {
	@IsString()
	readonly entityType: string = 'POST';

	@IsUUID()
	readonly entityId: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page: number = 1

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit: number = 5

	@IsOptional()
	@IsUUID()
	userId: string;
}

