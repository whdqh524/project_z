import { IsString } from "class-validator";
export class SignInAccountReqDto {
  @IsString()
  readonly accountId: string

  @IsString()
  readonly password: string
}