import { IsString, IsBoolean, IsOptional, MinLength, IsDate, Validate, IsIn, IsUUID } from 'class-validator'
import { NotUrlValidator } from "@project_z_web_backend/common";
import { EVENT_BOARD_CATEGORIES } from "@project_z_web_backend/common";
import { Type } from "class-transformer";
export class UpdateEventDto {

  @IsUUID()
  eventId: string;

  @IsOptional()
  @IsString()
  @IsIn(EVENT_BOARD_CATEGORIES)
  readonly category: string;

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
  @MinLength(1)
  readonly content: string;

  @IsOptional()
  @IsOptional()
  @IsBoolean()
  readonly isExposed: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly startDate: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly endDate: Date
}