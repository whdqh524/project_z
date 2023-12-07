import { Module, Global } from '@nestjs/common';
import { WebDbConnector } from './web';
import { GameDbConnector } from './game';
import { ConfigModule } from '@nestjs/config';
@Module({
	imports : [ConfigModule],
    controllers: [],
	providers : [
		WebDbConnector,
		GameDbConnector,
	],
	exports : [
		WebDbConnector,
		GameDbConnector
	]
})
export class RdbModule {}