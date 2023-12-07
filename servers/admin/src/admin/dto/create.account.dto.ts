import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'
export class CreateAccountReqDto {
  @IsString()
  readonly accountId: string

  @IsString()
  readonly password: string

  @IsString()
  readonly name: string

  @IsString()
  readonly nickname: string

  @IsOptional()
  @IsString()
  readonly department: string

  @IsOptional()
  @IsString()
  readonly adminPermissionGroupId: string
}