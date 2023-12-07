import { IsString, IsBoolean, IsOptional, MinLength, IsDate, Validate, IsIn, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { NOTICE_BOARD_CATEGORIES } from "@project_z_web_backend/common";
export class CreateNoticeDto {
  @IsString()
  readonly board: string = 'NOTICE';

  @IsString()
  @IsIn(NOTICE_BOARD_CATEGORIES)
  readonly category: string;

  @IsString()
  @MinLength(2)
  readonly title: string;

  @IsString()
  @MinLength(1)
  readonly content: string;

  @IsOptional()
  @IsBoolean()
  readonly isFixed: boolean = false;

  @IsOptional()
  @IsBoolean()
  readonly isExposed: boolean = true;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly assignedAt: Date = new Date();

  @IsOptional()
  @IsUUID()
  userId: string;
}