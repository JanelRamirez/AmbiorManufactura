import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public-route.decorator';
import { AuthJwtService } from 'src/auth-permission/services/auth-jwt.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private request = null;
  constructor(
    private reflector: Reflector,
    private authService: AuthJwtService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const ctx = context.switchToHttp();
    this.request = ctx.getRequest();
    const token = this.request.headers?.authorization;

    if (!token) {
      //cambiar por el translate
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = this.authService.validateToken(token);

    if (!payload) {
      //cambiar por el translate
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
