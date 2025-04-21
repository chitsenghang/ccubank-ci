import { Column, Entity } from 'typeorm';
import { AuditBaseEntity } from '../../common/entity/audit-base.entity';

@Entity()
export class Language extends AuditBaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  nameTranslation: string;

  @Column({ type: 'text', nullable: true })
  logo: string;
}
