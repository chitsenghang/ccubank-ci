import { Column, Entity, ManyToOne } from 'typeorm';
import { AuditBaseEntity } from '../../common/entity/audit-base.entity';
import { Language } from '../../language/entity/language.entity';

@Entity()
export class PageContent extends AuditBaseEntity {
  @Column()
  pageCode: string;

  @ManyToOne(() => Language, (language) => language)
  language: Language;

  @Column({ nullable: true })
  componentId: number;

  @Column({ type: 'jsonb' })
  content: Record<string, any>;

  @Column()
  ordering: number;
}
