import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GetUpdateInputDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly year: number;

	@IsOptional()
	@IsString()
	readonly search: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page: number = 1;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit: number = 10;
}

export class GetUpdateDetailInputDto {
	@IsString()
	readonly postId: string;
}