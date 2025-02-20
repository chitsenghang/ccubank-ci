import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditBaseEntity } from '../../common/entities/audit-base.entity';
import { Permission } from '../../permission/entity/permission.entity';
import { Role } from '../../role/entity/role.entity';

@Entity()
export class RolePermission extends AuditBaseEntity {
  @ManyToOne(() => Permission, (permission) => permission.rolePermission)
  @JoinColumn({ foreignKeyConstraintName: 'fk_permission_permission_id' })
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.rolePermission)
  @JoinColumn({ foreignKeyConstraintName: 'fk_role_role_id' })
  role: Role;
}
