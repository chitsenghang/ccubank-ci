import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
  Unique
} from 'typeorm';
import { AuditBaseEntity } from '../../common/entities/audit-base.entity';
import { RolePermission } from '../../rolepermission/entity/role-permission';

@Entity()
@Tree('materialized-path')
@Unique('uk_permission_name_parent', ['name', 'parent'])
export class Permission extends AuditBaseEntity {
  @Column()
  @Unique('uk_permission_name', ['name'])
  name: string;

  @TreeChildren()
  children: Permission[];

  @TreeParent()
  @JoinColumn({ foreignKeyConstraintName: 'fk_parent_id_permission_id' })
  parent: Permission;

  @OneToMany(
    () => RolePermission,
    (RolePermission) => RolePermission.permission
  )
  rolePermission: RolePermission[];
}
