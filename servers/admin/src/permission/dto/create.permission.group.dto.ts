import { IsString } from 'class-validator'
export class CreatePermissionGroupReqDto {
  @IsString()
  readonly name: string;
}