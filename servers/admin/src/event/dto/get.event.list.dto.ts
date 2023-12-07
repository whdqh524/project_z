import { IsNumber, IsString, IsOptional, IsArray, IsBoolean, IsDate, IsUUID, IsIn } from 'class-validator'
import { Type } from 'class-transformer';
import { EVENT_BOARD_CATEGORIES, EVENT_DATE_COMPARISON } from "@project_z_web_backend/common";

export class GetEventListDto {
  @IsString()
  readonly board: string = 'EVENT';

  @IsOptional()
  @IsString()
  @IsIn(EVENT_BOARD_CATEGORIES)
  readonly category: string;

  @IsOptional()
  @IsString()
  @IsIn(EVENT_DATE_COMPARISON)
  readonly comparison: string;

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