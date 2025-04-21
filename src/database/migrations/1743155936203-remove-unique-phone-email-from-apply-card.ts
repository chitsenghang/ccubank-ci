import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniquePhoneEmailFromApplyCard1743155936203
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE apply_card DROP CONSTRAINT IF EXISTS uk_phone_number;
        ALTER TABLE apply_card DROP CONSTRAINT IF EXISTS uk_email_address;

        ALTER TABLE apply_card ADD COLUMN "card_id" INTEGER;
    `);
  }

  public async down(): Promise<void> {}
}
