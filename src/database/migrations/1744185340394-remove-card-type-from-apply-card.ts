import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCardTypeFromApplyCard1744185340394
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE apply_card DROP COLUMN card_type;
    `);
  }

  public async down(): Promise<void> {}
}
