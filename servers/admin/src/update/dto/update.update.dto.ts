import { IsString, IsOptional, MinLength, Validate, IsIn, IsUUID, IsDate } from "class-validator";
import { NotUrlValidator } from "@project_z_web_backend/common";
import { COMMUNITY_STATUS } from "@project_z_web_backend/common";
import { Type } from "class-transformer";
export class UpdateUpdateDto {
  @IsOptional()
  @IsString()
  @Validate(NotUrlValidator)
  readonly thumbnailImageUrl: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly title: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly summary: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  readonly content: string;

  @IsOptional()
  @IsString()
  @IsIn(COMMUNITY_STATUS)
  readonly status: string;

  @IsUUID()
  updateId: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly assignedAt: Date;
}
