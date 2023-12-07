import { IsUUID } from "class-validator";

export class PlayPostInputDto {
	@IsUUID()
	readonly postId: string;
}