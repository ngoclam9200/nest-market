import { MigrationInterface, QueryRunner } from 'typeorm';

export class Productimg1720608130838 implements MigrationInterface {
  name = 'Productimg1720608130838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."product_image_type_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_image" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "url" character varying NOT NULL, "size" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT false, "type" "public"."product_image_type_enum" NOT NULL DEFAULT '3', CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_image"`);
    await queryRunner.query(`DROP TYPE "public"."product_image_type_enum"`);
  }
}
