import { Injectable, Inject } from '@nestjs/common';
import { RedisCache } from "cache-manager-redis-yet";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ADMIN_SESSION_EXPIRE_TIME, DEMO_SESSION_EXPIRE_TIME, USER_SESSION_EXPIRE_TIME } from "../../enum";
import { RedisClientType } from "redis";

@Injectable()
export class RedisManager {
	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: RedisCache) {}

	get client(): RedisClientType {
		return this.cacheManager.store.client;
	}

	/**
	 * 재사용 되는 레디스 관련 함수 정의
	 */
	async setUserSession(userId:string, token:string, sessionType:string='connection') {
		await this.client.set(`user_session:${sessionType}:${token}`, userId, {EX: USER_SESSION_EXPIRE_TIME});
	}

	async getUserSession(token:string, sessionType: string='connection'):Promise<string> {
		return await this.client.get(`user_session:${sessionType}:${token}`);
	}

	async deleteUserSession(token:string, sessionType: string='connection'):Promise<void>{
		await this.client.del(`user_session:${sessionType}:${token}`);
	}

	async setAdminSession(adminUser:object, token:string, sessionType='connection'){
		await this.client.set(`admin_session:${sessionType}:${token}`, JSON.stringify(adminUser), {EX: ADMIN_SESSION_EXPIRE_TIME});
	}

	async getAdminSession(token:string, sessionType='connection'): Promise<any>{
		const adminUserString: string = await this.client.get(`admin_session:${sessionType}:${token}`);
		return JSON.parse(adminUserString);
	}

	async setDemoSession(userId: string, token: string, sessionType= 'connection'): Promise<void> {
		await this.client.set(`demo_session:${sessionType}:${token}`, userId, {EX: DEMO_SESSION_EXPIRE_TIME});
	}

	async getDemoSession(token: string, sessnionType= 'connection'): Promise<string> {
		return await this.client.get(`demo_session:${sessnionType}:${token}`);
	}
}