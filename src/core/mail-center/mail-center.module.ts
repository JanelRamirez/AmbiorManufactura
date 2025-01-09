import { Module } from '@nestjs/common';
import { MailCenterService } from './mail-center.service';
import { RestClientModule } from '../rest-client/rest-client.module';

@Module({
  providers: [MailCenterService],
  controllers: [],
  imports: [RestClientModule],
  exports: [MailCenterService, RestClientModule],
})
export class MailCenterModule {}
