import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AuditBaseEntity } from '../../common/entities/audit-base.entity';
import { UserRole } from '../../userrole/entity/user-role.entity';

@Entity()
export class User extends AuditBaseEntity {
  @Column()
  isActive: boolean;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  @Unique('uk_user_phone', ['phone'])
  phone: string;

  @Column({ default: false })
  phoneVerified: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: false })
  resetPassword: boolean;

  @Column({ nullable: true })
  @Unique('uk_user_email', ['email'])
  email: string;

  @Column({ default: true, name: 'is_self_service' })
  isSelfService: boolean;

  @OneToMany(() => UserRole, (UserRole) => UserRole.user)
  userRole: UserRole[];
}
