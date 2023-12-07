import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LoggerMiddleware, RdbModule, RedisModule} from '@project_z_web_backend/common'
import { AdminModule } from './admin/admin.module';
import { PermissionModule } from './permission/permission.module';
import { FileModule } from './file/file.module';
import { NoticeModule } from './notice/notice.module';
import { UpdateModule } from './update/update.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { ComplainModule } from './complain/complain.module';
import { DemoModule } from './demo/demo.module';
import * as process from "process";

@Module({
  imports : [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'stage' ? './env.stage' : '.env.dev'
    }),
    RdbModule, RedisModule, AdminModule, PermissionModule, FileModule, NoticeModule, UpdateModule, EventModule, UserModule, ComplainModule, DemoModule],
  controllers : [AppController],
  providers : [AppService, ConfigService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
