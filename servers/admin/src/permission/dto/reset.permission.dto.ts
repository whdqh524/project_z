import { IsArray, IsString } from "class-validator";
export class ResetPermissionReqDto {
  @IsString()
  readonly adminPermissionGroupId: string;

  @IsArray()
  readonly permissions: {
    readonly code:string,
    readonly canEdit:boolean
  }[];
}