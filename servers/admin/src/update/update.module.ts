import { Module } from '@nestjs/common';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';
import { WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [UpdateService, WebDbConnector, ConfigService, RedisManager, WhiteListManager],
  controllers: [UpdateController]
})
export class UpdateModule {}
