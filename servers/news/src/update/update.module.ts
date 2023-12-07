import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';
import { ConfigService } from "@nestjs/config";
import { WebDbConnector } from "@project_z_web_backend/common";

@Module({
  controllers: [UpdateController],
  providers: [UpdateService, ConfigService, WebDbConnector]
})
export class UpdateModule {}
