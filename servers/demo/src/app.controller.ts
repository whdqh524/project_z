import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SignInInputDto } from "./dto/sign.in.dto";
import { AuthGuard } from "./middleware/auth.guard";
import { GetLinkLitInputDto } from "./dto/get.link.dto";

@Controller('demo')
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Post('signIn')
	async signIn(@Body() body: SignInInputDto): Promise<string> {
		return await this.appService.signIn(body)
	}

	@UseGuards(AuthGuard)
	@Get('link/list/:category')
	async getLinkList(@Param() params: any, @Query() query: GetLinkLitInputDto): Promise<object> {
		return await this.appService.getLinkList(params.category, query)
	}
}
