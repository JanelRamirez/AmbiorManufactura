import { AutoMap } from '@automapper/classes';
import { ResponseBaseDto } from 'src/base/dtos/response-base.dto';

export class OrderStatusResponseDto extends ResponseBaseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;
}