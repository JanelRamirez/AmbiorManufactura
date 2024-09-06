import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SelfRegisteredModel } from 'src/core/database/register-model.decorator';

type EmpleadoDocument = HydratedDocument<Empleado>;

@Schema()
@SelfRegisteredModel()
class Empleado {
  @Prop({ type: Types.ObjectId, auto: true })
  _id?: Types.ObjectId;

  @AutoMap()
  @Prop({ type: String, required: true })
  name: string;
}

const EmpleadoSchema = SchemaFactory.createForClass(Empleado);

export { Empleado, EmpleadoSchema, EmpleadoDocument };
