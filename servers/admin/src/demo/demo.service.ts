import { Injectable } from '@nestjs/common';
import {
	encryptAESPassword,
	decryptAESPassword,
	S3Provider,
	WebDbConnector,
	CategoryNotMatch, ExposeAtLeastOne
} from "@project_z_web_backend/common";
import {
	GetLinkListInputDto,
	UploadCompleteInputDto,
	UpdateVideoLinkInputDto, DeleteLinkInputDto
} from "./dto/link.dto";

@Injectable()
export class DemoService {
	constructor(
		private readonly webDB: WebDbConnector,
		private readonly s3Provider: S3Provider
	) {
	}

	async getCurrentPassword(): Promise<string> {
		const user = await this.webDB.adminUser.findUnique({where: {accountId: 'demo'}});
		return decryptAESPassword(user.password, user.salt);
	}

	async updatePassword(password: string): Promise<void> {
		const user = await this.webDB.adminUser.findUnique({where: {accountId: 'demo'}});
		await this.webDB.adminUser.update({data: {password: encryptAESPassword(password, user.salt)}, where: {accountId: 'demo'}});
	}

	async getLinkList(category: string, {page, limit}: GetLinkListInputDto): Promise<object> {
		this.checkCategory(category);
		const transactions = [
			this.webDB.demoLink.findMany({where: {category: category}, skip: (page-1) * limit, take: limit}),
			this.webDB.demoLink.count({where:{category: category}})
		]
		const [linkList, count] = await this.webDB.$transaction(transactions)
		return {links:linkList, count}
	}

	async getUploadUrl(category: string, fileName: string): Promise<string> {
		this.checkCategory(category);
		return await this.s3Provider.getDemoUrl(category, fileName);
	}

	async uploadComplete(category: string, {title, url}: UploadCompleteInputDto): Promise<void> {
		this.checkCategory(category);
		await this.webDB.demoLink.create({data: {category, url, title: title}});
	}

	async updateVideoLink({videoLinks}: UpdateVideoLinkInputDto): Promise<void> {
		let exposeCount = 0;
		const transactions = [];
		const prevLinkIds = [];
		const prevLinks = await this.webDB.demoLink.findMany({where: {category: 'VIDEO'}});
		prevLinks.map((value) => {
			prevLinkIds.push(value.id);
		});
		const updateIds = [];
		for(const videoLink of videoLinks) {
			if(videoLink.category !== 'VIDEO') {
				throw new CategoryNotMatch();
			}
			if(videoLink.id) {
				transactions.push(this.webDB.demoLink.update({
					data: {url: videoLink.url, title : videoLink.title, isExposed: videoLink.isExposed},
					where:{id: videoLink.id}
				}));
				updateIds.push(videoLink.id);
			}
			else {
				transactions.push(this.webDB.demoLink.create({
					data: {category: 'VIDEO', url: videoLink.url, title: videoLink.title, isExposed: videoLink.isExposed}
				}))
			}
			if(videoLink.isExposed) {
				exposeCount += 1;
			}
		}
		if(exposeCount === 0) {
			throw new ExposeAtLeastOne();
		}
		for(const id of prevLinkIds) {
			if(!updateIds.includes(id)) {
				transactions.push(this.webDB.demoLink.delete({where: {id: id}}));
			}
		}
		await this.webDB.$transaction(transactions);
	}

	async deleteLink({linkId}: DeleteLinkInputDto): Promise<void> {
		await this.webDB.demoLink.delete({where: {id: linkId}});
	}

	checkCategory(category: string) {
		if(!category || !['IR', 'APK', 'VIDEO'].includes(category)) {
			throw new CategoryNotMatch()
		}
	}
}
