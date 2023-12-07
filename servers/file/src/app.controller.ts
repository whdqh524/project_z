import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard, UserId } from "@project_z_web_backend/common";
import { SignedUrlImageInputDto } from "./dto/signedUrl.image.dto";

@UseGuards(AuthGuard)
@Controller('signedUrl')
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get('image')
	async getSignedUrlForImage(@Query() query: SignedUrlImageInputDto): Promise<object> {
		return await this.appService.getSignedUrlImage(query.files)
	}

    @Get('image/profile')
    async getSignedUrlForImageProfile(@UserId() userId: string): Promise<object> {
        return await this.appService.getSignedUrlForImageProfile(userId);
    }

    @Get('image/background')
  async getSignedUrlForImageBackground(@UserId() userId: string): Promise<object> {
      return await this.appService.getSignedUrlForImageBackground(userId);
    }
}
