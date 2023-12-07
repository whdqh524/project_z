import { IsUUID } from "class-validator";

export class DeletePostInputDto {
	@IsUUID()
	readonly postId: string;
}
