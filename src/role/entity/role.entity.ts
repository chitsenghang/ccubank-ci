import { Column, Entity, OneToMany } from 'typeorm';
import { AuditBaseEntity } from '../../common/entities/audit-base.entity';
import { UserRole } from '../../userrole/entity/user-role.entity';
import { RolePermission } from '../../rolepermission/entity/role-permission';

@Entity()
export class Role extends AuditBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isSystemDefined: boolean;

  @Column({ default: true })
  isEnabled: boolean;

  @OneToMany(() => UserRole, (UserRole) => UserRole.role)
  userRole: UserRole[];

  @OneToMany(() => RolePermission, (RolePermission) => RolePermission.role)
  rolePermission: RolePermission[];
}
