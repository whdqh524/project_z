import { IsUUID } from "class-validator";

export class AdminPermissionGroupListDto {
  @IsUUID()
  adminPermissionGroupId: string;
}