import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMediaStoreFileAndApplyCard1741228203667
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media" (
            "id" SERIAL NOT NULL,
            "version" INTEGER NOT NULL DEFAULT(0),
            "entity_type" VARCHAR(100) NOT NULL,
            "mime_type" VARCHAR(100) NOT NULL,
            "name" VARCHAR NOT NULL,
            "filename" VARCHAR NOT NULL,
            "description" VARCHAR NULL,
            "entity_id" INTEGER NOT NULL,
            "size" INTEGER NOT NULL,
            "updated_by" INTEGER,
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "created_by" INTEGER,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            CONSTRAINT "pk_media" PRIMARY KEY ("id"))
        `
    );
    await queryRunner.query(`
          CREATE TABLE apply_card (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(100) NOT NULL,
          request_credit_amount DECIMAL(8,2) NOT NULL,
          card_type VARCHAR(20) CHECK (card_type IN ('Visa', 'Mastercard', 'UPI')),
          phone_number VARCHAR(100) NOT NULL,
          email_address VARCHAR(100) NOT NULL,
          already_have_account BOOLEAN DEFAULT TRUE,
          company_name VARCHAR(100),
          occupation VARCHAR(100),
          industry_business_nature VARCHAR(100),
          income_monthly DECIMAL(8,2),
          document_income TEXT);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TABLE "apply_card"`);
  }
}
