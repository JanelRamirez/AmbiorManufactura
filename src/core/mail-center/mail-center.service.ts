import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RestClientService } from '../rest-client/rest-client.service';
import { IRequestParams } from '../rest-client/IRequestParams';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from '../app-config/enums/config-key.enum';
import { IMailConfiguration } from '../app-config/interfaces/mail-config.interface';
import { IMailBody, IMailConfig } from './mail-center.models';

@Injectable()
export class MailCenterService {
  private readonly logger: Logger;
  private baseRequest: IRequestParams;
  private mailConfig: IMailConfig;

  constructor(
    private readonly cnfService: ConfigService,
    private readonly restClient: RestClientService,
  ) {
    const authConfig: IMailConfiguration = this.cnfService.get(ConfigKey.Mail);

    this.logger = new Logger(MailCenterService.name);
    this.baseRequest = {
      method: 'POST',
      action: authConfig.mail_action,
      url: authConfig.mail_url,
      config: {},
    };
    this.mailConfig = {
      appKey: authConfig.mail_key,
      secretKey: authConfig.mail_secret,
    };
  }

  /**
   * Sends an email through the mail center.
   * The app and template must be configured in the mail center. To do this, please refer to the mail center: http://mailcenter.semarena.local/
   * @template T Type of the result object from the response of the mail center
   * @param {IMailBody} mailBody Body of the email to be sent
   * @returns {T} Result from the response of the mail center
   */
  async sendMail<T>(mailBody: IMailBody): Promise<T> {
    try {
      /**
       * The mail center expects the emails to be separated by semicolon, in case of multiple emails
       */
      const toString: string = Array.isArray(mailBody.to)
        ? mailBody.to.join(';')
        : mailBody.to;
      
      if (!toString || toString?.trim() == '')
        return <T>{ error: "Unable to send email on empty mail receptors" };

      const ccString: string = Array.isArray(mailBody.cc)
        ? mailBody.cc.join(';')
        : mailBody.cc;

      const ccoString: string = Array.isArray(mailBody.cco)
        ? mailBody.cco.join(';')
        : mailBody.cco;

      const request: IRequestParams = {
        ...this.baseRequest,
        body: {
          ...this.mailConfig,
          ...mailBody,
          to: toString,
          cc: ccString ?? null,
          cco: ccoString ?? null,
          variables: mailBody.variables ?? {},
        },
      };

      return this.restClient.sendRequest<T>(request);
    } catch (error) {
      throw new BadRequestException(error, "An error has ocurred while sending emails");
    }
  }

  sendMultipleMail(mails: IMailBody[]): void {
    mails.forEach(async (mail) => {
      await this.sendMail(mail);
    });
  }
}
