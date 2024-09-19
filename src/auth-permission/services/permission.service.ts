import { Injectable } from '@nestjs/common';
import { RestClientService } from 'src/core/rest-client/rest-client.service';
import { AuthJwtService } from './auth-jwt.service';
import { Permission } from '../models/permission';
import { Employee } from '../models/employee';
import { ConfigService } from '@nestjs/config';
import { IAuthConfig } from 'src/core/app-config/interfaces/auth-config.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';

@Injectable()
export class PermissionService {
  constructor(private http: RestClientService,
    private authService: AuthJwtService,
    private readonly cnfService: ConfigService
  ) {}

  async getPermissionsByToken(token: string): Promise<string[]> {
    const decodedToken: Employee = this.authService.validateToken(token);
    const authConfig: IAuthConfig = this.cnfService.get(ConfigKey.Auth);

    if (!decodedToken) {
      //agregar translation
      throw new Error('Invalid token');
    }

    const result: Array<Permission> = await this.http.sendRequest<Array<Permission>>({
      method: 'GET',
      url: authConfig.url,
      action: `user/GetPermisos/${decodedToken.Empleado}/${authConfig.appId}`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    return result.map((x) => x._permiso_Codigo);
  }
}
