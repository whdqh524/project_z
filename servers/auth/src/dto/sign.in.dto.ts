import { IsNumber, IsString, IsOptional, IsBoolean, IsIn } from 'class-validator'
import { Type } from 'class-transformer'
import { OAUTH_PLATFORM } from "@project_z_web_backend/common";
export class SignInInputDto {
	@IsString()
	readonly access_token: string

	@IsNumber()
	@Type(() => Number)
	@IsIn(OAUTH_PLATFORM)
	readonly platform: number

	@IsOptional()
	@IsString()
	readonly client: string = 'WEB'
}

export class SignInOutputDto {
	@IsString()
	readonly token: string

	@IsBoolean()
	readonly signUp: boolean
}