import { IsString, IsBoolean, IsOptional, MinLength, Validate, IsIn, IsUUID, IsDate } from "class-validator";
import { COMMUNITY_STATUS, NOTICE_BOARD_CATEGORIES } from "@project_z_web_backend/common";
import { Type } from "class-transformer";
export class UpdateNoticeDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly title: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  readonly content: string;

  @IsOptional()
  @IsString()
  @IsIn(NOTICE_BOARD_CATEGORIES)
  readonly category: string;

  @IsOptional()
  @IsString()
  @IsIn(COMMUNITY_STATUS)
  readonly status: string;

  @IsUUID()
  noticeId: string;

  @IsOptional()
  @IsBoolean()
  readonly isFixed: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isExposed: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly assignedAt: Date;
}
