import { Column, Entity } from 'typeorm';
import { AuditBaseEntity } from '../../common/entity/audit-base.entity';

@Entity()
export class ComplaintFeedback extends AuditBaseEntity {
  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 50 })
  phoneNumber: string;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 100 })
  emailAddress: string;

  @Column({ name: 'is_ccubank_customer', type: 'boolean' })
  isCcuBankCustomer: boolean;

  @Column({ length: 100 })
  timeOurTeamContact: string;

  @Column({ type: 'text', nullable: true })
  detail?: string;
}
