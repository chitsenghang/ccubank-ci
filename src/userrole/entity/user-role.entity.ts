import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditBaseEntity } from '../../common/entities/audit-base.entity';
import { Role } from '../../role/entity/role.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class UserRole extends AuditBaseEntity {
  @ManyToOne(() => User, (user) => user.userRole)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_user_id_user_id',
    name: 'user_id'
  })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRole)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_role_id_role_id',
    name: 'role_id'
  })
  role: Role;
}
