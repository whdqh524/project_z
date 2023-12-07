import { Injectable } from '@nestjs/common';
import { S3Provider } from "@project_z_web_backend/common";

@Injectable()
export class AppService {
	constructor(private readonly s3Provider: S3Provider) {}

    async getSignedUrlImage(files: string[]): Promise<object> {
        const promises = [];
        const signedUrlMap = {};
        for(const fileName of files) {
          promises.push(this.s3Provider.genImageUrl(fileName).then((url: string): void => {
              signedUrlMap[fileName] = url;
          }))
        }
        await Promise.all(promises);
        return signedUrlMap;
    }

    async getSignedUrlForImageProfile(userId: string): Promise<object> {
        const url = await this.s3Provider.genProfileUrl(userId);
        return {url: url};
    }

    async getSignedUrlForImageBackground(userId: string): Promise<object> {
        const url = await this.s3Provider.genBackgroundUrl(userId);
        return {url: url};
    }
}
