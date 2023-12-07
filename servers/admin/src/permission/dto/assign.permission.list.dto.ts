import { IsUUID } from "class-validator";

export class AssignPermissionListDto{
  @IsUUID()
  adminPermissionGroupId: string;
}