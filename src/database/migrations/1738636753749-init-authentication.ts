import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAuthentication1738636753749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "version" integer NOT NULL,
        "username" character varying NOT NULL,
        "password" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "email" character varying NULL,
        "is_self_service" boolean NOT NULL DEFAULT true,
        "phone_verified" boolean NOT NULL DEFAULT false,
        "email_verified" boolean NOT NULL DEFAULT false,
        "reset_password" boolean NOT NULL DEFAULT false,
        "is_active" boolean NOT NULL DEFAULT true,
        "updated_by" integer,
        "created_by" integer,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "uk_user_phone" UNIQUE ("phone"),
        CONSTRAINT "pk_user_id" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(`
    CREATE UNIQUE INDEX "uk_user_phone_active" ON "user" ("phone")
    WHERE deleted_at IS NULL;`);

    await queryRunner.query(`
    CREATE UNIQUE INDEX "uk_user_email_active" ON "user" ("email")
    WHERE deleted_at IS NULL;`);

    await queryRunner.query(`
    CREATE TABLE "role" (
      "id" SERIAL NOT NULL,
      "version" integer NOT NULL,
      "name" character varying NOT NULL,
      "description" character varying,
      "updated_by" integer,
      "created_by" integer,
      "is_system_defined" boolean NOT NULL DEFAULT false,
      "is_enabled" boolean NOT NULL DEFAULT true,
      "created_at" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
      "deleted_at" TIMESTAMP,
      CONSTRAINT "uk_role_role_name" UNIQUE ("name"),
      CONSTRAINT "pk_role_id" PRIMARY KEY ("id"))
    `);

    await queryRunner.query(`
    CREATE TABLE "permission" (
    "id" SERIAL NOT NULL,
    "version" integer NOT NULL,
    "name" character varying NOT NULL,
    "mpath" character varying DEFAULT '',
    "parent_id" integer,
    "updated_by" integer,
    "created_by" integer,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMP,
    CONSTRAINT "uk_permission_name" UNIQUE ("name"),
    CONSTRAINT "uk_permission_name_parent" UNIQUE ("name", "parent_id"),
    CONSTRAINT "fk_parent_id_permission_id" FOREIGN KEY ("parent_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "pk_permission_id" PRIMARY KEY ("id"))`);

    await queryRunner.query(`
    CREATE TABLE "role_permission" (
      "id" SERIAL NOT NULL,
      "version" integer NOT NULL,
      "permission_id" integer,
      "role_id" integer,
      "updated_by" integer,
      "created_by" integer,
      "created_at" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
      "deleted_at" TIMESTAMP,
      CONSTRAINT "uk_role_permission_permission_role" UNIQUE ("permission_id", "role_id"),
      CONSTRAINT "pk_role_permission_id" PRIMARY KEY ("id"))`);

    await queryRunner.query(`
    CREATE TABLE "user_role" (
      "id" SERIAL NOT NULL,
      "version" integer NOT NULL,
      "user_id" integer,
      "role_id" integer,
      "updated_by" integer,
      "created_by" integer,
      "created_at" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
      "deleted_at" TIMESTAMP,
      CONSTRAINT "user_role_constrain" UNIQUE ("user_id", "role_id"),
      CONSTRAINT "fk_user_id_user_id" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT "pk_user_role_id" PRIMARY KEY ("id"))`);

    await queryRunner.query(
      `CREATE TABLE "otp" (
        "id" SERIAL NOT NULL, 
        "key" UUID NOT NULL DEFAULT uuid_generate_v4(), 
        "code" CHARACTER VARYING NOT NULL, 
        CONSTRAINT "pk_otp_id" PRIMARY KEY ("id")
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "role_permission"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "otp"`);
  }
}
