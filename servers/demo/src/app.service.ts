import { Injectable } from '@nestjs/common';
import {
	CategoryNotMatch, decryptAESPassword,
	InvalidPassword,
	randomString,
	RedisManager,
	WebDbConnector
} from "@project_z_web_backend/common";
import { SignInInputDto } from "./dto/sign.in.dto";
import { GetLinkLitInputDto } from "./dto/get.link.dto";

@Injectable()
export class AppService {
	constructor(
		private readonly webDB: WebDbConnector,
		private readonly redisManager: RedisManager
	) {}

	async signIn({accountId, password}: SignInInputDto): Promise<string> {
		const user =  await this.webDB.adminUser.findUnique({where:{accountId: accountId}});

		if(decryptAESPassword(user.password, user.salt) !== password) throw new InvalidPassword();
		const token: string = randomString();
		await this.redisManager.setDemoSession(user.id, token);
		return token;
	}

	async getLinkList(category: string, {page, limit}: GetLinkLitInputDto): Promise<object> {
		this.checkCategory(category);
		const transactions = [
			this.webDB.demoLink.findMany({where: {category: category, isExposed: true}, skip: (page-1)*limit, take: limit}),
			this.webDB.demoLink.count({where: {category: category}})
		]
		const [linkList, count] = await this.webDB.$transaction(transactions);
		return {links: linkList, count: count};
	}

	checkCategory(category: string): void {
		if(!category || !['VIDEO', 'IR', 'APK'].includes(category)) {
			throw new CategoryNotMatch()
		}
	}
}