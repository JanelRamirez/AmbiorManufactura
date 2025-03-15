import { UserCreateDto } from './dtos/create-user.dto';
import { UserUpdateDto } from './dtos/update-user.dto';
import { UserEntity } from './entity/user.toEntity';
import { UserResponseDto } from './dtos/response-user.dto';
import { BaseMapper } from 'src/base/base.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

@Injectable()
export class UserMapper extends BaseMapper<
  UserEntity,
  UserCreateDto,
  UserUpdateDto,
  UserResponseDto
> {
  constructor(@InjectMapper() private mapper: Mapper) {
    super(mapper);
  }

  override mapEntityToResponse(entity: UserEntity): UserResponseDto {
    return this.mapper.map<UserEntity, UserResponseDto>(
      entity,
      UserEntity,
      UserResponseDto,
    );
  }

  override mapArrayToResponse(entity: UserEntity[]): UserResponseDto[] {
    return this.mapper.mapArray<UserEntity, UserResponseDto>(
      entity,
      UserEntity,
      UserResponseDto,
    );
  }

  override mapUpdateDtoToEntity(entity: UserUpdateDto): UserEntity {
    return this.mapper.map<UserUpdateDto, UserEntity>(
      entity,
      UserUpdateDto,
      UserEntity,
    );
  }

  override mapCreateDtoToEntity(dto: UserCreateDto): UserEntity {
    return this.mapper.map<UserCreateDto, UserEntity>(
      dto,
      UserCreateDto,
      UserEntity,
    );
  }

  override mapCreateArrayToEntity(dto: UserCreateDto[]): UserEntity[] {
    return this.mapper.mapArray<UserCreateDto, UserEntity>(
      dto,
      UserCreateDto,
      UserEntity,
    );
  }

  override mapCreateUpdateArrayToEntity(dto: UserUpdateDto[]): UserEntity[] {
    return this.mapper.mapArray<UserUpdateDto, UserEntity>(
      dto,
      UserUpdateDto,
      UserEntity,
    );
  }
}
