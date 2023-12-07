import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [NoticeController],
  providers: [NoticeService, WebDbConnector, ConfigService, RedisManager, WhiteListManager]
})
export class NoticeModule {}
