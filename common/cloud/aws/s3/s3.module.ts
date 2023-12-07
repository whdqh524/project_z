import { Module } from "@nestjs/common";
import { S3Provider } from './s3.provider'
import { ConfigService } from "@nestjs/config";

@Module({
	providers: [S3Provider, ConfigService],
	exports:[S3Provider]
})
export class S3Module {}