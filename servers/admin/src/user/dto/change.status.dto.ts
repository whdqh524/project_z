import { IsIn, IsString, IsUUID } from "class-validator";
import { Type } from 'class-transformer';
import { ACCOUNT_STATUS } from "@project_z_web_backend/common";

export class ChangeStatusDto {
  @IsUUID()
  userId: string;

  @IsString()
  @IsIn(ACCOUNT_STATUS)
  status: string;
}