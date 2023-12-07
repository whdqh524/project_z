import { Module } from '@nestjs/common';
import { ComplainService } from './complain.service';
import { ComplainController } from './complain.controller';
import { WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [ComplainService, WebDbConnector, ConfigService, RedisManager, WhiteListManager],
  controllers: [ComplainController]
})
export class ComplainModule {}
