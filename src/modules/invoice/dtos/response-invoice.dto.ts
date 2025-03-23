import { AutoMap } from '@automapper/classes';
import { ResponseBaseDto } from 'src/base/dtos/response-base.dto';

export class InvoiceResponseDto extends ResponseBaseDto {

  @AutoMap()
  orderId: number;  // Relación con el pedido
  
  @AutoMap()
  amount: number;  // Monto de la factura (puede ser el anticipo o el pago final)
  
  @AutoMap()
  paymentMethod: string;  // Método de pago (tarjeta, transferencia, etc.)
  
  @AutoMap()
  paymentStatus: string;
}