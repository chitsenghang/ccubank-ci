import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitLanguage1741315202771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE language
            (
                id               SERIAL PRIMARY KEY,
                name             VARCHAR(100) NOT NULL,
                name_translation VARCHAR(100) NOT NULL,
                logo             TEXT,
                "version"        integer NOT NULL,
                "updated_by"     integer,
                "created_by"     integer,
                "created_at"     TIMESTAMP    NOT NULL DEFAULT now(),
                "updated_at"     TIMESTAMP    NOT NULL DEFAULT now(),
                "deleted_at"     TIMESTAMP
            );
            CREATE INDEX idx_language_name ON language(name);
            CREATE INDEX idx_language_name_translation ON language(name_translation);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "language"`);
  }
}
