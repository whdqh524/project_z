import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator'

export class MyInfoInputDto {
	@IsOptional()
	@IsString()
	readonly nickname: string;

	@IsOptional()
	@IsString()
	readonly profileImageUrl: string;

	@IsOptional()
	@IsString()
	readonly status: string;

	@IsOptional()
	@IsString()
	readonly summary: string;

	@IsOptional()
	@IsString()
	readonly backgroundType: string;

	@IsOptional()
	@IsString()
	readonly backgroundColor: string;

	@IsOptional()
	@IsString()
	readonly backgroundImageUrl: string;

	@IsOptional()
	@IsObject()
	readonly sns: object;
}

export class CheckExistNicnameOutputDto {
	@IsBoolean()
	readonly exist: boolean;
}