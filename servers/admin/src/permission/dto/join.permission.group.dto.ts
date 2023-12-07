import { IsString } from 'class-validator'
export class JoinPermissionGroupReqDto {
  @IsString()
  readonly adminPermissionGroupId: string;

  @IsString()
  readonly adminId: string;
}