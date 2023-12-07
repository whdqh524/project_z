import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { WebDbConnector, RedisManager, WhiteListManager } from "@project_z_web_backend/common";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [EventService, WebDbConnector, ConfigService, RedisManager, WhiteListManager],
  controllers: [EventController]
})
export class EventModule {}
