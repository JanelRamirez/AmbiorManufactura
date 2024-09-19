import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/role.decorator';
import { PermissionService } from 'src/auth-permission/services/permission.service';

@Injectable()
export class RolesGuard implements CanActivate {
  request = null;
  constructor(
    private reflector: Reflector,
    private readonly permission: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    this.request = ctx.getRequest();
    const token = this.request.headers?.authorization?.replace('Bearer ', '');

    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const result = await this.permission.getPermissionsByToken(token);
    return result.some((role) => roles.includes(role));
  }
}
