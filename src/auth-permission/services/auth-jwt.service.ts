import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../models/employee';
import { IAuthConfig } from 'src/core/app-config/interfaces/auth-config.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';

@Injectable()
export class AuthJwtService {
  private employee: Employee;
  constructor(
    private readonly jwtService: JwtService,
    private readonly cnfService: ConfigService
  ) {}

  validateToken(token: string): Employee {
    try {
      token = token.replace('Bearer ', '');
      const authConfig: IAuthConfig = this.cnfService.get(ConfigKey.Auth);
      const key = authConfig.secret;
      const decodedString = Buffer.from(key, 'base64');
      const employee: Employee = this.jwtService.verify(token, {
        ignoreExpiration: false,
        secret: decodedString,
      });
      return employee;
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
