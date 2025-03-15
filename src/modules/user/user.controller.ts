import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { UserEntity } from './entity/user.toEntity';
import { UserCreateDto } from './dtos/create-user.dto';
import { UserUpdateDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/response-user.dto';
import { UserService } from './service/user.service';
import { UserMapper } from './user.mapper';
import { UserValidator } from './user.validator';

@Controller('api/user')
@ApiTags('user')
export class UserController extends BaseController<
  UserEntity,
  UserCreateDto,
  UserUpdateDto,
  UserResponseDto
> 
{
  constructor(
    private readonly _UserService: UserService,
    private readonly _UserMapper: UserMapper,
    private readonly _UserValidator: UserValidator,
  ) {
    super(_UserService, _UserMapper, _UserValidator);
  }
}
