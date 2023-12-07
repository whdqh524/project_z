import { IsString, IsBoolean, IsOptional, MinLength, IsDate, Validate, IsIn, IsUUID } from 'class-validator'
import { NotUrlValidator } from "@project_z_web_backend/common";
import { Type } from "class-transformer";
export class CreateUpdateDto {
  @IsString()
  readonly board: string = 'UPDATE';

  @IsString()
  readonly category: string = 'GENERAL';

  @IsOptional()
  @IsString()
  @Validate(NotUrlValidator)
  readonly thumbnailImageUrl: string;

  @IsString()
  @MinLength(2)
  readonly summary: string;

  @IsString()
  @MinLength(2)
  readonly title: string;

  @IsString()
  @MinLength(1)
  readonly content: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly assignedAt: Date = new Date();

  @IsOptional()
  @IsUUID()
  userId: string;
}