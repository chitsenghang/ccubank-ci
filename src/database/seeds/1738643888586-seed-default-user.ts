import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedDefaultUser1738643888586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordSalt = Number(process.env.PASSWORD_SALT);
    const users = await queryRunner.query(`
      INSERT INTO "user" (
        "version", 
        username, 
        password, 
        phone, 
        updated_by, 
        created_by,
        created_at, 
        updated_at, 
        deleted_at, 
        email, 
        is_self_service, 
        phone_verified, 
        email_verified
      ) 
      VALUES 
      (
       1, 'admin', '${bcrypt.hashSync('admin@2025', passwordSalt)}', 
        '+85511855611', NULL, NULL, NOW(), 
        NOW(), NULL, 'admin@gmail.com', false, true, true
      ) RETURNING id, phone, username;
    `);

    const roles = await queryRunner.query(
      `SELECT id FROM "role" where "name" = 'Admin';`
    );
    await queryRunner.query(`
          INSERT INTO "user_role" ("version", role_id, user_id, updated_by, created_by, created_at,updated_at, deleted_at)
          VALUES
              (
                  1, '${roles[0].id}', ${users[0].id}, NULL, NULL, NOW(), NOW(), NULL
              );
      `);
  }

  public async down(): Promise<void> {}
}
