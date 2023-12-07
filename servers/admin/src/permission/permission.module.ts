import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";
import { ConfigService } from "@nestjs/config";
import {  } from "@project_z_web_backend/common";
import {  } from "@project_z_web_backend/common";

@Module({
  providers: [PermissionService, WebDbConnector, ConfigService, RedisManager, WhiteListManager],
  controllers: [PermissionController]
})
export class PermissionModule {}
