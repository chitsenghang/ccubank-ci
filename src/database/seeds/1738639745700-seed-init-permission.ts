import { MigrationInterface, QueryRunner } from 'typeorm';
import { SpecialModule } from '../../common/constants/permission/special.permission';

export class SeedInitPermission1738639745700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "permission" (id, "version", "name", mpath, parent_id, updated_by, created_by, created_at, updated_at, deleted_at)
        VALUES
            (1, 1, 'SPECIAL_MODULE', '1.', NULL, NULL, NULL, NOW(), NOW(), NULL),
            (2, 1, 'ALL_FUNCTION', '1.2.', 1, NULL, NULL, NOW(), 'NOW()', NULL),
            (3, 1, 'READ_ALL_FUNCTION', '1.3.', 1, NULL, NULL, 'NOW()', 'NOW()', NULL)
    `);
    const admin = await queryRunner.query(
      `INSERT INTO "role" (id, "version", "name", description, updated_by, created_by, created_at, updated_at, deleted_at) 
      VALUES(DEFAULT, 1, 'Admin', 'manage everything has full control', NULL, NULL, now(), now(), NULL) RETURNING id;`
    );
    const adminPermission = await queryRunner.query(
      `SELECT id FROM "permission" where "name" = '${SpecialModule[0].default.admin}';`
    );
    await queryRunner.query(
      `INSERT INTO "role_permission"
      (id, "version", "role_id", "permission_id", updated_by, created_by, created_at, updated_at, deleted_at) 
      VALUES(DEFAULT, 1, ${admin[0].id}, ${adminPermission[0].id}, NULL, NULL, now(), now(), NULL);`
    );

    const user = await queryRunner.query(
      `INSERT INTO "role" (id, "version", "name", description, updated_by, created_by, created_at, updated_at, deleted_at)
     VALUES(DEFAULT, 1, 'User', 'normal service user', NULL, NULL, now(), now(), NULL) RETURNING id;
    `
    );

    const userPermission = await queryRunner.query(
      `SELECT id FROM "permission" where "name" = '${SpecialModule[0].default.user}';`
    );

    await queryRunner.query(
      `INSERT INTO "role_permission"
      (id, "version", "role_id", "permission_id", updated_by, created_by, created_at, updated_at, deleted_at) 
      VALUES(DEFAULT, 1, ${user[0].id}, ${userPermission[0].id}, NULL, NULL, now(), now(), NULL);`
    );
  }

  public async down(): Promise<void> {}
}
