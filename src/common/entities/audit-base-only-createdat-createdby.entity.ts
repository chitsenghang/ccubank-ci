import {
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  VersionColumn
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { DateTimeTransformer } from './date-value-transformer';

export class AuditBaseOnlyCreatedByAndCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'created_by',
    foreignKeyConstraintName: 'fk_user_id_created_by'
  })
  createdBy: User;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: new DateTimeTransformer()
  })
  createdAt: Date;

  @VersionColumn()
  version: number;
}
