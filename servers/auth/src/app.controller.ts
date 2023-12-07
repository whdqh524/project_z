import { Controller, Get, Post, Put, Patch, Body, Req, Request, UseGuards, Query } from '@nestjs/common';
import {
	// 접속
	SignInInputDto,
	SignInOutputDto,
	// 상세페이지
	MyInfoInputDto,
} from "./dto";
import {AppService} from './app.service';
import { User } from '@project_z_web_backend/common'
import { AuthGuard } from "@project_z_web_backend/common";
import { UserId } from "@project_z_web_backend/common"
import { CheckExistNicnameOutputDto } from "./dto/my.info.dto";

@Controller('auth')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('signIn')
	async signIn(@Body() inputData: SignInInputDto): Promise<SignInOutputDto> {
		return await this.appService.signIn(inputData)
	}

	@UseGuards(AuthGuard)
	@Get('check/token')
	async checkToken(): Promise<void> {
		return;
	}

	@UseGuards(AuthGuard)
	@Get('myInfo')
	async getMyInfo(@UserId() userId: string): Promise<User> {
		return await this.appService.getMyInfo(userId)
	}

	@UseGuards(AuthGuard)
	@Put('myInfo')
	async patchMyInfo(@UserId() userId: string, @Body() body: MyInfoInputDto): Promise<void> {
		await this.appService.putMyInfo(userId, body);
		return;
	}

	@UseGuards(AuthGuard)
	@Get('nickname/exist')
	async checkNickNameExist(@Query() query: MyInfoInputDto):Promise<CheckExistNicnameOutputDto> {
		return await this.appService.checkNicknameExist(query.nickname);
	}

	@UseGuards(AuthGuard)
	@Patch('nickname')
	async patchNickname(@UserId() userId: string, @Body() body: MyInfoInputDto) {
		return await this.appService.patchNickname(userId, body.nickname);
	}

	@UseGuards(AuthGuard)
	@Post('logOut')
	async logOut(@Req() req: Request) {
		const token = req.headers['token'];
		return await this.appService.logOut(token);
	}
}
