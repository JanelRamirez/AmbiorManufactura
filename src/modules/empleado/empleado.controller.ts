import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { TranslationService } from 'src/core/translation/translation.service';
import { ConfigService } from '@nestjs/config';
import { TransformResponse } from '../../core/shared/decorators/transform-response.decorator';
import { ResponseType } from 'src/core/shared/enums/response-type.enum';
import { HelpService } from 'src/core/shared/providers/help.service';
import { HelpConfig } from 'src/core/shared/decorators/help-key.decorator';
import { HelpController } from 'src/base/help-controller.base';
import { MapperService } from 'src/core/shared/providers/mapper.service';
import { Empleado } from './empleado.entity';
import { EmpleadoDto } from './empleado.dto';
import { Public } from 'src/auth-permission/config/decorators/public-route.decorator';


@Controller('api/empleado')
@HelpConfig({ helpKey: 'Empleado' })
export class EmpleadoController extends HelpController {
  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly i18nService: TranslationService,
    private readonly configService: ConfigService,
    mapperService: MapperService,
    helpService: HelpService,
  ) {
    super(helpService, EmpleadoController, mapperService);
  }

  @Public()
  @Get('all')
  @TransformResponse({ responseType: ResponseType.PAGINATED })
  async getAllEmpleado() {
    const empleados = await this.empleadoService.getEmpleados();
    return this.mapperService.mapArray(empleados, Empleado, EmpleadoDto);
  }

  @Post('create')
  createEmpleado(@Body() test: EmpleadoDto): Promise<any> {
    const emp = this.mapperService.map(test, EmpleadoDto, Empleado);
    return this.empleadoService.createEmpleado(emp);
  }
}
