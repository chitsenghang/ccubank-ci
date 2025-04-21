import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDefaultLanguage1742792040098 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO language (name, name_translation, version, logo)
        VALUES 
          ('English', 'English', 1, 'https://img.icons8.com/?size=100&id=xapj7ZzAUZKI&format=png&color=000000'),
          ('Khmer', 'ខ្មែរ', 1, 'https://img.icons8.com/?size=100&id=2ui1n4CYeion&format=png&color=000000');
    `);
  }

  public async down(): Promise<void> {}
}
