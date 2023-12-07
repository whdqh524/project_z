import { IsString } from 'class-validator'
export class UpdatePermissionGroupReqDto {
  @IsString()
  readonly adminPermissionGroupId: string;

  @IsString()
  readonly name: string;
}