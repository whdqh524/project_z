import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { ConfigService } from "@nestjs/config";
import { WebDbConnector } from "@project_z_web_backend/common";

@Module({
  controllers: [NoticeController],
  providers: [NoticeService, ConfigService, WebDbConnector]
})
export class NoticeModule {}
