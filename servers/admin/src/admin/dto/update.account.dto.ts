import { IsString, IsOptional, IsUUID } from "class-validator";
export class UpdateAccountDto {
  @IsUUID()
  readonly adminId: string

  @IsOptional()
  @IsString()
  readonly password: string

  @IsOptional()
  @IsString()
  readonly name: string

  @IsOptional()
  @IsString()
  readonly nickname: string

  @IsOptional()
  @IsString()
  readonly department: string

  @IsOptional()
  @IsString()
  readonly adminPermissionGroupId: string
}