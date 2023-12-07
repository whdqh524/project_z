import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { ConfigService } from "@nestjs/config";
import { GameDbConnector, WebDbConnector } from "@project_z_web_backend/common";
import { RedisManager } from "@project_z_web_backend/common";
import { WhiteListManager } from "@project_z_web_backend/common";

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, ConfigService, WebDbConnector, GameDbConnector, RedisManager, WhiteListManager]
})
export class FavoriteModule {}
