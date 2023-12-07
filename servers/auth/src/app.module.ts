import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { RdbModule, RedisModule, LoggerMiddleware, WhiteListModule} from '@project_z_web_backend/common'

@Module({
	imports : [
		ConfigModule.forRoot({
			envFilePath:
				process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'stage' ?
					'./env.stage' : process.env.NODE_ENV === 'local' ? './.env.local' : '.env.dev'
		}),
		RdbModule, RedisModule, WhiteListModule],
	controllers : [AppController],
	providers : [AppService, ConfigService],
})
export class AppModule implements NestModule{
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
