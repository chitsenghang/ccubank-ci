import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDateColumnToApplycard1744341754186
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE apply_card ADD COLUMN date TIMESTAMP NOT NULL DEFAULT NOW();
    `);
  }

  public async down(): Promise<void> {}
}
