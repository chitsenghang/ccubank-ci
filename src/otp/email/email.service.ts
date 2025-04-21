import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailData, IMailFile } from '../../common/interface/mail.interface';
import { MediaService } from '../../media/service/media.service';
import { ModuleTypeEnum, TemplateNameEnum } from '../enum/module-type';
import { ComplaintFeedbackTypeEnum } from '../../complaintfeedback/enums/complaint-feedback-type.enum';
import {
  MAIL_APPLY_CARD_TO,
  MAIL_BCC,
  MAIL_CC,
  MAIL_COMPLAINT_FEEDBACK_TO
} from '../constant/email.constant';
import { SubCardTypeEnum } from '../../applycard/enum/card-type.enum';
import { IEmailService } from './email.service.interface';

@Injectable()
export class EmailService implements IEmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(mailData: IMailData): Promise<void> {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: mailData.subject,
      template: mailData.template,
      context: mailData.context || {},
      cc: mailData.cc,
      bcc: mailData.bcc,
      attachments: mailData.attachments
    });
  }

  async sendEmailByModule(
    data: any,
    moduleType: ModuleTypeEnum
  ): Promise<void> {
    const mails: string[] = this.getEmailByModuleType(moduleType);
    const ccMails: string[] = this.getEmailsFromEnv(MAIL_CC);
    const bccMails: string[] = this.getEmailsFromEnv(MAIL_BCC);
    const attachments: Array<IMailFile> = data?.documentIncome
      ? this.generateAttachments(data?.documentIncome)
      : null;
    await this.sendMail({
      to: mails,
      subject: this.getEmailSubject(data?.type),
      template:
        ModuleTypeEnum.COMPLAINT_FEEDBACK === moduleType
          ? TemplateNameEnum.EMAIL_NOTIFY_COMPLAINT_FEEDBACK
          : TemplateNameEnum.EMAIL_NOTIFY_APPLY_CARD,
      cc: ccMails,
      bcc: bccMails,
      context: {
        isComplaint: data?.type === ComplaintFeedbackTypeEnum.COMPLAINT,
        isDebitAndAlreadyHaveAccount:
          data?.subCardType === SubCardTypeEnum.DEBIT &&
          data?.alreadyHaveAccount,
        isDebit: data?.subCardType === SubCardTypeEnum.DEBIT,
        date: new Date().toLocaleDateString(),
        ...data
      },
      attachments
    });
  }

  private getEmailSubject = (type: string): string => {
    switch (type) {
      case ComplaintFeedbackTypeEnum.COMPLAINT:
        return process.env.MAIL_SUBJECT_COMPLAINT;
      case ComplaintFeedbackTypeEnum.FEEDBACK:
        return process.env.MAIL_SUBJECT_FEEDBACK;
      default:
        return process.env.MAIL_SUBJECT_APPLY_CARD;
    }
  };

  private getEmailByModuleType(moduleType: ModuleTypeEnum): string[] {
    if (moduleType === ModuleTypeEnum.APPLY_CARD) {
      return this.getEmailsFromEnv(MAIL_APPLY_CARD_TO);
    }
    return this.getEmailsFromEnv(MAIL_COMPLAINT_FEEDBACK_TO);
  }

  private getEmailsFromEnv(variableName: string): string[] {
    return (process.env[variableName] || '')
      .split(',')
      .map((email: string): string => email.trim());
  }

  private generateAttachments(fileName: string): Array<IMailFile> {
    const extension: string = fileName.split('.').pop();
    const storageDir: string =
      MediaService.validateAndDetermineStoragePath(extension);
    const filePath: string = join(storageDir, fileName);
    return filePath
      ? [
          {
            fileName,
            path: filePath
          }
        ]
      : [];
  }
}
