import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitGlobalConfigAndAuditLog1739245570793
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "global_configuration" (
            "id" SERIAL NOT NULL,
            "version" integer DEFAULT(0),
            "name" character varying UNIQUE NOT NULL,
            "is_enable" BOOLEAN DEFAULT (FALSE),
            "is_system_defined" BOOLEAN DEFAULT (FALSE),
            "value" character varying NOT NULL,
            "description" character varying NULL,
            "updated_by" integer,
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "fk_user_id_update_by" FOREIGN KEY ("updated_by") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT "pk_global_configuration_id" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `CREATE TABLE "audit_log" (
        "id" SERIAL NOT NULL,
        "version" integer NOT NULL DEFAULT(0),
        "request_method" character varying(10) NOT NULL,
        "request_url" character varying NOT NULL,
        "request_json" character varying NULL,
        "ip_address" character varying(100) NULL,
        "resource_id" integer null,
        "created_by" integer,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "pk_audit_log_id" PRIMARY KEY ("id"),
        CONSTRAINT "fk_user_id_created_by" FOREIGN KEY ("created_by") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gloabl_configuration"`);
    await queryRunner.query(`DROP TABLE "audit_log"`);
  }
}
