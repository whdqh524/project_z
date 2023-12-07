import {
	INestApplication,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PrismaClient} from './prisma/client';

// import { PrismaClient} from "@prisma/client";

@Injectable()
export class GameDbConnector
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy {
	constructor(private readonly configService: ConfigService) {
		super({
			datasources : {
				db : {
					url : configService.get('GAME_DATABASE_URL'),
				},
			},
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}

	// async enableShutdownHooks(app: INestApplication) {
	//     this.$on("beforeExit", async () => {
	//         await app.close();
	//     });
	// }
}