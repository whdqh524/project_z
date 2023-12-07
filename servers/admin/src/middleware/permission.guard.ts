import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { WebDbConnector, NoPermission } from "@project_z_web_backend/common";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly webDB: WebDbConnector
  ) {}

  async canActivate(context: ExecutionContext):Promise<boolean> {
    const permission: any = this.reflector.get<object>('permission', context.getHandler());
    if(!permission) return true;

    const request = context.switchToHttp().getRequest();
    const adminId = request.adminId;
    const adminUser = await this.webDB.adminUser.findUnique({where: {id:adminId}});
    if(!adminUser || !adminUser.adminPermissionGroupId) throw new NoPermission();

    const assignedPermission = await this.webDB.adminPermission.findFirst({
      where: {
        adminPermissionGroupId: adminUser.adminPermissionGroupId,
        code: permission.code,
        canEdit: permission.canEdit
      }
    })
    if(!assignedPermission) throw new NoPermission();

    return true;
  }
}