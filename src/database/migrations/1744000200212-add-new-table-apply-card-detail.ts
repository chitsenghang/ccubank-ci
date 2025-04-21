import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewTableApplyCardDetail1744000200212
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "apply_card_detail"
        (
            id  SERIAL PRIMARY KEY,
            apply_card_id INTEGER,
            card_id INTEGER,
            CONSTRAINT fk_apply_card_apply_card_id FOREIGN KEY (apply_card_id) REFERENCES apply_card(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "apply_card_detail"`);
  }
}
