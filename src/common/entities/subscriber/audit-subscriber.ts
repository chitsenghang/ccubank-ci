import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { AuditBaseEntity } from '../audit-base.entity';
import { RequestContextService } from '../../../requestcontext/request-context.service';

@EventSubscriber()
export class AuditSubscriber
  implements EntitySubscriberInterface<AuditBaseEntity>
{
  listenTo() {
    return AuditBaseEntity;
  }

  async afterInsert(event: InsertEvent<AuditBaseEntity>) {
    const { entity, manager } = event;
    if (!entity.createdBy) {
      entity.createdBy = RequestContextService.getCurrentUserId() ?? null;
      if (entity.createdBy) {
        await manager.save(entity);
      }
    }
  }

  async afterUpdate(event: UpdateEvent<AuditBaseEntity>) {
    const { entity, manager } = event;
    if (entity instanceof AuditBaseEntity) {
      entity.updatedBy = RequestContextService.getCurrentUserId() ?? null;
      entity.updatedAt = new Date();
      if (entity.updatedBy) {
        await manager.save(entity, { listeners: false });
      }
    }
  }
}
