import { IsString, IsBoolean, IsOptional, MinLength, IsDate, Validate, IsIn, IsUUID } from 'class-validator'
import { NotUrlValidator } from "@project_z_web_backend/common";
import { EVENT_BOARD_CATEGORIES } from "@project_z_web_backend/common";
import { Type } from "class-transformer";
export class CreateEventDto {
  @IsString()
  readonly board: string = 'EVENT';

  @IsString()
  @IsIn(EVENT_BOARD_CATEGORIES)
  readonly category: string = 'GENERAL';

  @IsOptional()
  @IsString()
  @Validate(NotUrlValidator)
  readonly thumbnailImageUrl: string;

  @IsString()
  @MinLength(2)
  readonly title: string;

  @IsString()
  @MinLength(1)
  readonly content: string;

  @IsOptional()
  @IsBoolean()
  readonly isExposed: boolean = true;

  @IsDate()
  @Type(() => Date)
  readonly startDate: Date

  @IsDate()
  @Type(() => Date)
  readonly endDate: Date

  @IsOptional()
  @IsUUID()
  userId: string;
}