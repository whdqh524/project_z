import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ConfigService } from "@nestjs/config";
import { AdminService } from './admin.service';
import { WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";

@Module({
  controllers: [AdminController],
  providers: [AdminService, WebDbConnector, RedisManager, ConfigService, WhiteListManager]
})
export class AdminModule {}
