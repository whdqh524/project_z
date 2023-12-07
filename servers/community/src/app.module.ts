import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RdbModule, RedisModule, LoggerMiddleware, WhiteListModule } from '@project_z_web_backend/common';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';
import { LikeModule } from './like/like.module';
import { ComplainModule } from './complain/complain.module';

@Module({
	imports : [
		ConfigModule.forRoot({
			envFilePath :
				process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'stage' ? './env.stage'
					: process.env.NODE_ENV === 'local' ? '.env.local' : '.env.dev'
		}),
		RdbModule, RedisModule, PostModule, CommentModule, WhiteListModule, ReplyModule, LikeModule, ComplainModule],
	controllers : [AppController],
	providers : [AppService],
	exports: [RdbModule, RedisModule, ConfigModule]
})
export class AppModule implements NestModule{
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}