import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware, RdbModule, RedisModule, S3Module, WhiteListModule } from '@project_z_web_backend/common';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports : [
    ConfigModule.forRoot({
      envFilePath :
          process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'stage' ? './env.stage'
              : process.env.NODE_ENV === 'local' ? '.env.local' : '.env.dev'
    }),
    RdbModule, RedisModule, WhiteListModule, S3Module],
  controllers : [AppController],
  providers : [AppService, ConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
