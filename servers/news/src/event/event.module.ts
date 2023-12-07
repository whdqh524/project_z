import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { ConfigService } from "@nestjs/config";
import { WebDbConnector } from "@project_z_web_backend/common";

@Module({
  controllers: [EventController],
  providers: [EventService, ConfigService, WebDbConnector]
})
export class EventModule {}
