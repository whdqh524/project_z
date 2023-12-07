import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ConfigService } from "@nestjs/config";
import { GameDbConnector, WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";

@Module({
  controllers: [PostController],
  providers: [PostService, ConfigService, WebDbConnector, GameDbConnector, RedisManager, WhiteListManager]
})
export class PostModule {}
