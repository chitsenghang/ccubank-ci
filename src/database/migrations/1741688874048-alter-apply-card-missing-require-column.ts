import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterApplyCardMissingRequireColumn1741688874048
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE apply_card
            ALTER COLUMN company_name SET NOT NULL,
            ALTER COLUMN occupation SET NOT NULL,
            ALTER COLUMN industry_business_nature SET NOT NULL,
            ALTER COLUMN income_monthly SET NOT NULL;
    `);
  }

  public async down(): Promise<void> {}
}
