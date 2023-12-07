import { Module } from '@nestjs/common';
import { ComplainController } from './complain.controller';
import { ComplainService } from './complain.service';
import { ConfigService } from "@nestjs/config";
import { GameDbConnector, WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";

@Module({
  controllers: [ComplainController],
  providers: [ComplainService, ConfigService, WebDbConnector, GameDbConnector, RedisManager, WhiteListManager]
})
export class ComplainModule {}
