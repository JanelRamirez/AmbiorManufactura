import { ConfigService } from '@nestjs/config';
import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public-route.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private request = null;
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    console.log(context.getHandler());
    console.log(context.getClass());
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const ctx = context.switchToHttp();
    this.request = ctx.getRequest();
    const token = this.request.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      //cambiar por el translate
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = this.validateToken(token);

    if (!payload) {
      //cambiar por el translate
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private validateToken(token: string) {
    try {
      const key = this.configService.get('JWT_SECRET');
      const decodedString = Buffer.from(key, 'base64');
      const test = this.jwtService.verify(token, {
        ignoreExpiration: false,
        secret: decodedString,
      });
      return test;
    } catch (error) {
      throw new HttpException(
        {
          error: 'Unauthorized',
          reason: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
