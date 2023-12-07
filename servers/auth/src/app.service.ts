import { Injectable } from '@nestjs/common';
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { WebDbConnector as WebDB, GameDbConnector as GameDB } from '@project_z_web_backend/common';
import { User, Prisma } from '@project_z_web_backend/common';
import { PlatformNotMatch, OauthInvalidRequest, InvalidNickname } from "@project_z_web_backend/common";
import { randomString } from "@project_z_web_backend/common";
import { RedisManager } from "@project_z_web_backend/common";
import {
	SignInInputDto, SignInOutputDto,
	MyInfoInputDto
} from "./dto";
import { CheckExistNicnameOutputDto } from "./dto/my.info.dto";

type OAuthUserData = {
	platform: number,
	oauthId?: string,
	email?: string,
	name?: string,
	profileImageUrl?: string
}

@Injectable()
export class AppService {
	constructor(
		private readonly webDB: WebDB,
		private readonly gameDB: GameDB,
		private readonly configService: ConfigService,
		private readonly redisManager: RedisManager) {
	}
	async signIn(reqData: SignInInputDto): Promise<SignInOutputDto> {
		let {access_token, platform, client} = reqData

		const oauthUserData:OAuthUserData = await this.getOauthUserData(platform, access_token);
		Object.assign(oauthUserData, {nickname: `user-${oauthUserData.oauthId}`})
		let signUp: boolean = false;
		let userModel: User = await this.webDB.user.findFirst({where : {oauthId : oauthUserData.oauthId}});
		if(!userModel) {
			userModel = await this.webDB.user.create({data : <Prisma.UserCreateInput>oauthUserData});
			signUp = true;
		}
		const token:string = randomString();
		if(client === 'WEB') {
			await this.redisManager.setUserSession(userModel.id, token);
		}
		return {token, signUp};
	}

	async getOauthUserData(platform:number, accessToken:string) {
		let result:OAuthUserData = {platform}
		switch (platform) {
			case 1:
				const data:OAuthUserData = await this.getGoogleUserData(accessToken)
				Object.assign(result, data)
				break;
			default:
				throw new PlatformNotMatch();
		}
		return result
	}

	async getGoogleUserData(accessToken: string): Promise<any> {
		const {data} = await axios.get(`${this.configService.get('GOOGLE_OAUTH_URI')}`, {params : {access_token : accessToken}})
			.catch(() => {
				throw new OauthInvalidRequest();
			})
		return {
			oauthId: data.sub, email: data.email, name: data.name, profileImageUrl: data.picture
		};
	};

	async getMyInfo(userId: string): Promise<User> {
		return await this.webDB.user.findUnique({where: {id: userId}});

	}
	async putMyInfo(userId: string, updateData: MyInfoInputDto) {
		if(updateData.nickname && !this.validNickname(updateData.nickname)) {
			throw new InvalidNickname();
		}
		await this.webDB.user.update({data : <Prisma.UserUpdateInput>updateData, where: {id: userId}});
	}

	async checkNicknameExist(nickname: string): Promise<CheckExistNicnameOutputDto> {
		if(!this.validNickname(nickname)) {
			throw new InvalidNickname();
		}
		const userModel: User = await this.webDB.user.findUnique({where: {nickname: nickname}});
		return {exist: !!userModel}
	}

	async patchNickname(userId: string, nickname: string): Promise<void> {
		await this.webDB.user.update({data:{nickname}, where: {id: userId}});
	}

	async logOut(token: string): Promise<void> {
		await this.redisManager.deleteUserSession(token);
	}
	validNickname (nickname:string):boolean {
		return /^[가-힣A-Za-z0-9-]{1,10}$/.test(nickname)
	}
}

