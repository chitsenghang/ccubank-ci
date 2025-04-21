import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPageContent1742460539348 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "page_content"
        (
            id               SERIAL PRIMARY KEY,
            version          INTEGER NOT NULL,
            page_code        VARCHAR(100) NOT NULL,
            language_id      INTEGER NOT NULL,
            component_id     VARCHAR(100),
            content          JSONB,
            ordering         INTEGER,
            updated_by       INTEGER,
            created_by       INTEGER,
            created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at       TIMESTAMP NOT NULL DEFAULT NOW(),
            deleted_at       TIMESTAMP,
            FOREIGN KEY (language_id) REFERENCES language(id)
        );

        CREATE INDEX idx_page_content_language_id_page_code_ordering ON page_content(language_id,page_code,ordering) 
            WHERE deleted_at IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "page_content"`);
  }
}
