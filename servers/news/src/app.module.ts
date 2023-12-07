import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeModule } from './notice/notice.module';
import { EventModule } from './event/event.module';
import { UpdateModule } from './update/update.module';
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "@project_z_web_backend/common/dist/middleware";

@Module({
	imports : [
		ConfigModule.forRoot({
			envFilePath :
				process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'stage' ? './env.stage' : '.env.dev'
		}),
		NoticeModule, EventModule, UpdateModule],
	controllers : [AppController],
	providers : [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
