import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";
import { ConfigService } from "@nestjs/config";
import {  } from "@project_z_web_backend/common";
import {  } from "@project_z_web_backend/common";

@Module({
  providers: [UserService, WebDbConnector, ConfigService, RedisManager, WhiteListManager],
  controllers: [UserController]
})
export class UserModule {}
