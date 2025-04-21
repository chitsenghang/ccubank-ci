export interface IMailData {
  to: string | string[];
  subject: string;
  template: string;
  context?: Record<string, any>;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: any[];
}

export interface IMailFile {
  fileName: string;
  path: string;
}
