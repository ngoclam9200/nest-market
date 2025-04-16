import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductTb1730279737618 implements MigrationInterface {
  name = 'ProductTb1730279737618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "list_media_id" text NOT NULL DEFAULT '[]', "default_media_id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id_created" integer NOT NULL, "user_id_updated" integer NOT NULL, "branch_id" integer NOT NULL, "status" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "branch_id" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "description" SET DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "description" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "branch_id"`);
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "status" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
