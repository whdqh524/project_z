import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { RedisManager, S3Provider, WebDbConnector, WhiteListManager } from "@project_z_web_backend/common";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [DemoController],
  providers: [DemoService, WebDbConnector, S3Provider, ConfigService, RedisManager, WhiteListManager]
})
export class DemoModule {}
