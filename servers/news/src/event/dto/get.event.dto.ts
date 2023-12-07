import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { IsBooleanFromZ } from "@project_z_web_backend/common";

export class GetEventsInputDto {
	@IsBooleanFromZ()
	readonly isOpen: boolean;

	@IsOptional()
	@IsString()
	readonly title: string;

	@IsOptional()
	@IsString()
	readonly content: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page: number = 1;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit: number = 4;
}
export class GetEventDetailInputDto {
	@IsString()
	readonly postId: string;
}