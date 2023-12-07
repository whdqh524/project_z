import {
	Injectable,
	CanActivate,
	ExecutionContext
} from "@nestjs/common";
import { RedisManager, AuthTokenExpiredError } from "@project_z_web_backend/common";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly redisManager: RedisManager
	) {}

	async canActivate(context: ExecutionContext):Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request.headers.token;
		const userId = await this.redisManager.getDemoSession(token);
		if(!userId) {
			throw new AuthTokenExpiredError();
		}
		await this.redisManager.setDemoSession(userId, token);
		request.userId = userId;
		return true;
	}
}