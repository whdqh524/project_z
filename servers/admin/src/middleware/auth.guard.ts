import {
	Injectable,
	CanActivate,
	ExecutionContext
} from "@nestjs/common";
import { RedisManager, WhiteListManager, AuthTokenExpiredError } from "@project_z_web_backend/common";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly redisManager: RedisManager,
		private readonly whiteListManager: WhiteListManager
	) {}

	async canActivate(context: ExecutionContext):Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		if(this.whiteListManager.checkEndPoint(request.url.split('?')[0])) {
			return true;
		}
		const token = request.headers.token;
		const adminUser = await this.redisManager.getAdminSession(token)
		if(!adminUser) throw new AuthTokenExpiredError();

		await this.redisManager.setAdminSession(adminUser, token);
		request.adminId = adminUser.id;
		request.userId = adminUser.userId;
		return true;
	}
}