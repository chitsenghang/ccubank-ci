import { Column, Entity } from 'typeorm';
import { AuditBaseEntity } from '../../common/entity/audit-base.entity';
import { MediaEntityTypeEnum } from '../../common/enums/media-entity-type.enum';

@Entity()
export class Media extends AuditBaseEntity {
  @Column()
  entityType: MediaEntityTypeEnum;

  @Column()
  entityId: number;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  name: string;

  @Column()
  filename: string;

  @Column()
  description: string;
}
