import { IsUUID } from "class-validator";

export class DeleteReplyInputDto {
	@IsUUID()
	readonly replyId: string;
}