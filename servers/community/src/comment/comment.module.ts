import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ConfigService } from "@nestjs/config";
import { GameDbConnector, WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";

@Module({
  controllers: [CommentController],
  providers: [CommentService, ConfigService, WebDbConnector, GameDbConnector, RedisManager, WhiteListManager]
})
export class CommentModule {}
