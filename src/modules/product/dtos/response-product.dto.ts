import { AutoMap } from '@automapper/classes';
import { ResponseBaseDto } from 'src/base/dtos/response-base.dto';

export class ProductResponseDto extends ResponseBaseDto {
  @AutoMap()
  id: string;
}