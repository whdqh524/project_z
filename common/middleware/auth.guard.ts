import {
	Injectable,
	CanActivate,
	ExecutionContext,
	// BadRequestException
} from "@nestjs/common";
import { RedisManager } from "../database/Redis";
import { AuthTokenExpiredError } from "../modules/error";
import { WhiteListManager } from "./whiteList/white.list.manager";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly redisManager: RedisManager,
		private readonly whiteListManager: WhiteListManager
	) {}

	async canActivate(context: ExecutionContext):Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request.headers.token;
		const userId = await this.redisManager.getUserSession(token);
		if(!token || !userId) {
			if(request.method == 'GET' && this.whiteListManager.checkEndPoint(request.url.split('?')[0])) {
				return true;
			}
			else {
				throw new AuthTokenExpiredError();
			}
		}
		await this.redisManager.setUserSession(userId, token);
		request.userId = userId;
		return true;
	}
}