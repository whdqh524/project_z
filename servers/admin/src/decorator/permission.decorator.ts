import { SetMetadata } from "@nestjs/common";

export const Permission = (permissionInfo: {
  code: string,
  canEdit?: boolean
}) => SetMetadata('permission', permissionInfo);