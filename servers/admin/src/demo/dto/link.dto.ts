import {
	ArrayMinSize,
	IS_UUID,
	IsArray,
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	Validate
} from "class-validator";
import { Type } from "class-transformer";
import { IsBooleanFromZ, NotUrlValidator } from "@project_z_web_backend/common";

interface VideoLinks {
	id?: string
	category: string
	title: string
	url: string
	isExposed: boolean
}

export class GetLinkListInputDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	page: number = 1;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit: number = 10;
}

export class GetUploadUrlInputDto {
	@IsString()
	readonly fileName: string;
}

export class UploadCompleteInputDto {
	@IsString()
	readonly title: string;

	@Validate(NotUrlValidator)
	readonly url: string;
}

export class UpdateVideoLinkInputDto {
	@IsArray()
	@ArrayMinSize(1)
	readonly videoLinks: VideoLinks[]
}

export class DeleteLinkInputDto {
	@IsUUID()
	readonly linkId: string;
}