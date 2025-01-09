import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IMailBody } from './mail-center.models';
import { MailCenterService } from './mail-center.service';
import { Public } from 'src/auth-permission/config/decorators/public-route.decorator';

@Public()
/* @Roles(Role.Super, Role.Admin) */
@Controller('api/mailCenter')
@ApiTags('MailCenter')
export class MailCenterController {
  constructor(private readonly mailService: MailCenterService) {}

  @Post('sendMail')
  async sendMail(@Body() req: IMailBody): Promise<any> {
    await this.mailService.sendMail(req);
    return { message: 'Mail sent successfully' };
  }
}
