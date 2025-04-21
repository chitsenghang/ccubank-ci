import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterApplyCardAddRequestCreditAmountAndRemoveColumnCardid1743999369300
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE apply_card ADD COLUMN enter_account_link_with_card VARCHAR(255),
        DROP COLUMN card_id;

        ALTER TABLE apply_card 
        ALTER COLUMN full_name DROP NOT NULL,
        ALTER COLUMN request_credit_amount DROP NOT NULL,
        ALTER COLUMN phone_number DROP NOT NULL,
        ALTER COLUMN email_address DROP NOT NULL;
    `);
  }

  public async down(): Promise<void> {}
}
