import { IsUUID } from "class-validator";

export class DeleteCommentInputDto {
	@IsUUID()
	readonly commentId: string;
}