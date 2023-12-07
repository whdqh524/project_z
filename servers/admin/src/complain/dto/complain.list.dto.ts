import { IsNumber, IsOptional, IsIn, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { ACCOUNT_STATUS } from "@project_z_web_backend/common";

export class ComplainListDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}