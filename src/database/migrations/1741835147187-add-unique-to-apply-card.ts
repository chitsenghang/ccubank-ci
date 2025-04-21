import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueToApplyCard1741835147187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE apply_card
        DROP CONSTRAINT IF EXISTS apply_card_card_type_check;
             
        DELETE FROM apply_card;
        ALTER TABLE apply_card
        ADD CONSTRAINT uk_phone_number UNIQUE (phone_number),
        ADD CONSTRAINT uk_email_address UNIQUE (email_address);
    `);
  }

  public async down(): Promise<void> {}
}
