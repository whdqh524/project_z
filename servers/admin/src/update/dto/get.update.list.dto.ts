import { IsString, IsNumber, IsOptional, MinLength, IsDate, Validate, IsIn, IsUUID } from 'class-validator'
import { Type } from 'class-transformer';
import { NotUrlValidator } from "@project_z_web_backend/common";
export class GetUpdateListDto {
  @IsString()
  readonly board: string = 'UPDATE';

  @IsString()
  readonly category: string = 'GENERAL';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  year: number;

  @IsOptional()
  @IsString()
  readonly search: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}