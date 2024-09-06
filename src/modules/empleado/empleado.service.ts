import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Empleado } from './empleado.entity';

@Injectable()
export class EmpleadoService {
  constructor(@InjectModel(Empleado.name) private testModel: Model<Empleado>) {}

  async createEmpleado(test: Empleado): Promise<Empleado> {
    test._id = null;
    const createdEmpleado = new this.testModel(test);
    return createdEmpleado.save();
  }

  async getEmpleados(): Promise<Empleado[]> {
    return this.testModel.find().exec();
  }
}
