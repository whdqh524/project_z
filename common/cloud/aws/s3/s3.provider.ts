import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import { AWS_PRESIGNED_URL_EXPIRE_TIME } from '../../../enum'

@Injectable()
export class S3Provider {
	private readonly client: S3Client
	private readonly bucket: string;
	constructor(private readonly configService: ConfigService) {
		this.client = new S3Client({
			region: configService.get('AWS_S3_REGION'),
			credentials: {
				accessKeyId: configService.get('AWS_S3_ACCESS_KEY_ID'),
				secretAccessKey: configService.get('AWS_S3_ACCESS_KEY')
			}
		});
		this.bucket = configService.get('AWS_S3_BUCKET');
	}

	async genPreSignedUrl(command: PutObjectCommand): Promise<string> {
		return await getSignedUrl(this.client, command, { expiresIn: AWS_PRESIGNED_URL_EXPIRE_TIME })
	}
	async genImageUrl(fileName:string):Promise<string> {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: `images/${this.generateDatePath()}/${Date.now()}_${fileName}`,
			ContentType: 'image/*'
		})
		return await this.genPreSignedUrl(command);
	}

	async genProfileUrl(userId:string) {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: `images/${userId}/profile`,
			ContentType: 'image/*'
		})
		return await this.genPreSignedUrl(command);
	}

	async genBackgroundUrl(userId:string) {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: `images/${userId}/background`,
			ContentType: 'image/*'
		})
		return await this.genPreSignedUrl(command);
	}

	async getDemoUrl(fileType: string, fileName: string): Promise<string> {
		const command = new PutObjectCommand({
			Bucket:this.bucket,
			Key: `demo/${fileType}/${fileName}`,
			ContentType: fileType === 'IR' ? 'application/pdf' : 'application/vnd.android.package-archive'
		});
		return await this.genPreSignedUrl(command);
	}

	generateDatePath() {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}
}
