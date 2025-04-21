import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSomeColumnOptionalApplyCard1743756700502
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE apply_card
            ALTER COLUMN company_name DROP NOT NULL,
            ALTER COLUMN occupation DROP NOT NULL,
            ALTER COLUMN industry_business_nature DROP NOT NULL,
            ALTER COLUMN income_monthly DROP NOT NULL;
    `);
  }

  public async down(): Promise<void> {}
}
