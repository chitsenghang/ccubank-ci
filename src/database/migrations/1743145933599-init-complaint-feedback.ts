import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitComplaintFeedback1743145933599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "complaint_feedback"
        (
            id                   SERIAL PRIMARY KEY,
            version              INTEGER NOT NULL,
            full_name            VARCHAR(100) NOT NULL,
            phone_number         VARCHAR(50) NOT NULL,
            email_address        VARCHAR(100) NOT NULL,
            type                 VARCHAR(50) NOT NULL,
            is_ccubank_customer  BOOLEAN NOT NULL,
            time_our_team_contact VARCHAR(100) NOT NULL,
            detail               TEXT NULL,
            updated_by           INTEGER,
            created_by           INTEGER,
            created_at           TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at           TIMESTAMP NOT NULL DEFAULT NOW(),
            deleted_at           TIMESTAMP
        );

        CREATE INDEX idx_complaint_feedback_full_name_phone_number_email_address_type 
            ON complaint_feedback(full_name,phone_number,email_address,type)
            WHERE deleted_at IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "complaint_feedback"`);
  }
}
