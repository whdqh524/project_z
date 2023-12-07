import { Module } from '@nestjs/common';
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from 'cache-manager-redis-yet';
import { RedisManager } from './redis.manager';

@Module({
	imports:[CacheModule.registerAsync({
		imports: [ConfigModule],
		inject:[ConfigService],
		isGlobal:true,
		useFactory: async (configService: ConfigService) => ({
			store: await redisStore({
				socket: {
					host:configService.get('REDIS_HOST'),
					port: configService.get('REDIS_PORT')
				},
				username: configService.get('REDIS_USER'),
				password: configService.get('REDIS_PASS'),
				database: configService.get('REDIS_DB'),
			})
		})
	})],
	providers:[RedisManager],
	exports: [RedisManager]
})
export class RedisModule {}