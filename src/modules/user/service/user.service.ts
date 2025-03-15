import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { UserEntity } from "../entity/user.toEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from "../dtos/create-user.dto";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _UserRepository: Repository<UserEntity>
  ) {
    super(_UserRepository);
  }

  async findByEmail(email: string): Promise<UserEntity>{
    return this._UserRepository.findOne({where:{ email }})
  }

  async create(data: UserEntity): Promise<UserEntity>{
    const hashed = await bcrypt.hash( data.password, 10);
    data.password = hashed;
    const user = this._UserRepository.create(data);
    return this._UserRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<UserEntity>{
    const user = await this.findByEmail(email);
    const match = await bcrypt.compare(password, user.password)
    if(user && match)
      return user;

    return null;
  }
}