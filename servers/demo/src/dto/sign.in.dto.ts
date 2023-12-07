import { IsString } from "class-validator";

export class SignInInputDto {
	@IsString()
	readonly password: string;

	@IsString()
	readonly accountId: string = 'demo';
}