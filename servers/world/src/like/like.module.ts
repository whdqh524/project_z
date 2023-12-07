import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { ConfigService } from "@nestjs/config";
import { GameDbConnector, WebDbConnector } from "@project_z_web_backend/common";
import { RedisManager } from "@project_z_web_backend/common";
import { WhiteListManager } from "@project_z_web_backend/common";

@Module({
  controllers: [LikeController],
  providers: [LikeService, ConfigService, WebDbConnector, GameDbConnector, RedisManager, WhiteListManager]
})
export class LikeModule {}
