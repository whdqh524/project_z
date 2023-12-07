import { IsArray } from 'class-validator'
export class SignedUrlDto {
  @IsArray()
  readonly files: string[] = []
}