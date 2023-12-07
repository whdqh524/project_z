import { IsString } from "class-validator";

export class UpdatePasswordInputDto {
	@IsString()
	readonly password: string;
}