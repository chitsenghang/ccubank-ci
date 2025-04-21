import { IMailData } from '../../common/interface/mail.interface';
import { ModuleTypeEnum } from '../enum/module-type';

export interface IEmailService {
  sendMail(mailData: IMailData): Promise<void>;

  sendEmailByModule(data: any, moduleType: ModuleTypeEnum): Promise<void>;
}
