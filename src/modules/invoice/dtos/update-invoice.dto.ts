import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseUpdateDto } from "src/base/dtos/update-base.dto";

export class InvoiceUpdateDto extends BaseUpdateDto {
  @AutoMap()
  orderId: number;  // Relación con el pedido
  
  @AutoMap()
  amount: number;  // Monto de la factura (puede ser el anticipo o el pago final)
  
  @AutoMap()
  paymentMethod: string;  // Método de pago (tarjeta, transferencia, etc.)
  
  @AutoMap()
  paymentStatus: string;
  }