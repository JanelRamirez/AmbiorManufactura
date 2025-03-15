import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";

export class UserCreateDto extends BaseCreateDto {
   @AutoMap()
   name: string;
 
   @AutoMap()
   email: string
 
   @AutoMap()
   password: string
 
   @AutoMap()
   address: string
 
   @AutoMap()
   rol: string
 
   @AutoMap()
   nui: string
 
   @AutoMap()
   birthdate: Date

   @AutoMap()
   phone: string
  }