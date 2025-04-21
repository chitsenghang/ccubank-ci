import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApplyCardDetail } from '../applycarddetail/entity/apply-card-detail.entity';

@Entity()
export class ApplyCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  requestCreditAmount: number;

  @Column({ type: 'varchar', length: 100 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100 })
  emailAddress: string;

  @Column({ type: 'boolean', default: true })
  alreadyHaveAccount: boolean;

  @Column({ type: 'varchar', length: 100 })
  companyName: string;

  @Column({ type: 'varchar', length: 100 })
  occupation: string;

  @Column({ type: 'varchar', length: 100 })
  industryBusinessNature: string;

  @Column({ type: 'varchar', length: 255 })
  enterAccountLinkWithCard: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  incomeMonthly: number;

  @Column({ type: 'text' })
  documentIncome?: string;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP'
  })
  date: Date;

  @OneToMany(
    () => ApplyCardDetail,
    (applyCardDetail) => applyCardDetail.applyCard
  )
  applyCardDetail: ApplyCardDetail[];
}
