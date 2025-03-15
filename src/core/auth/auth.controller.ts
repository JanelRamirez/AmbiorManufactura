import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/service/user.service';
import { UserCreateDto } from 'src/modules/user/dtos/create-user.dto';
import { UserMapper } from 'src/modules/user/user.mapper';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
    private userMapper: UserMapper
  ) {}

  @Post('register')
  async register(@Body() body: UserCreateDto) {
    const entity = this.userMapper.mapCreateDtoToEntity(body)
    entity.userCreated = 1;
    const user = await this.usersService.create(entity);
    const response = this.userMapper.mapEntityToResponse(user);
    return { message: 'Usuario registrado', response };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    try{
      const result = await this.authService.login(req.user);
      return result
    }catch( err ){
      throw err;
    }
  }
}
