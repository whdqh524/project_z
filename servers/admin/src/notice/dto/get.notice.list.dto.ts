import { IsNumber, IsString, IsOptional, IsArray, IsBoolean, IsDate, IsUUID, IsIn } from 'class-validator'
import { Type } from 'class-transformer';
import { NOTICE_BOARD_CATEGORIES } from "@project_z_web_backend/common";

export class GetNoticeListDto {
  @IsString()
  readonly board: string = 'NOTICE';

  @IsOptional()
  @IsString()
  @IsIn(NOTICE_BOARD_CATEGORIES)
  readonly category: string;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}