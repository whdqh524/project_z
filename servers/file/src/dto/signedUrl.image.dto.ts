import { ArrayMinSize, IsArray } from "class-validator";

export class SignedUrlImageInputDto {
	@IsArray()
	@ArrayMinSize(1)
	readonly files: string[]
}