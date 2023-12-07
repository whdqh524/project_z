import { IsUUID } from "class-validator";
export class GroupLeaveDto {
  @IsUUID()
  readonly adminId: string;
}