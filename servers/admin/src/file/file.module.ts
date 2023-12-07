import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { RedisManager, WhiteListManager, S3Module, WebDbConnector } from "@project_z_web_backend/common";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [S3Module],
  controllers: [FileController],
  providers: [WebDbConnector, RedisManager, ConfigService, WhiteListManager]
})
export class FileModule {}
