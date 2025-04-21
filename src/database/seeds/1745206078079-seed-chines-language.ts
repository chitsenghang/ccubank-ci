import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedChinesLanguage1745206078079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO language (name, name_translation, version, logo)
        VALUES ('Chinese', '中国人', 1, 'https://img.icons8.com/?size=100&id=17962&format=png&color=000000');
    `);
  }

  public async down(): Promise<void> {}
}
