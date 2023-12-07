import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { ConfigService } from "@nestjs/config";
import { GameDbConnector, WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";

@Module({
  controllers: [ReplyController],
  providers: [ReplyService, ConfigService, WebDbConnector, GameDbConnector, RedisManager, WhiteListManager]
})
export class ReplyModule {}
