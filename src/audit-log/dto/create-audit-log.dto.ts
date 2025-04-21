import { User } from '../../user/entity/user.entity';

export class CreateAuditLogDtoDto {
  requestMethod: string;

  requestUrl: string;

  requestJson?: string;

  ipAddress: string;

  resourceId?: number;

  createdBy?: User;
}
