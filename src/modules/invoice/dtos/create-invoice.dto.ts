import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { BaseCreateDto } from "src/base/dtos/create-base.dto";

export class InvoiceCreateDto extends BaseCreateDto {
  @AutoMap()
  orderId: number;  // Relación con el pedido
  
  @AutoMap()
  amount: number;  // Monto de la factura (puede ser el anticipo o el pago final)
  
  @AutoMap()
  paymentMethod: string;  // Método de pago (tarjeta, transferencia, etc.)
  
  @AutoMap()
  paymentStatus: string;
  }