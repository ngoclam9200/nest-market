import { MigrationInterface, QueryRunner } from "typeorm";

export class Addressusertbl1719825879136 implements MigrationInterface {
    name = 'Addressusertbl1719825879136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address_user" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "province_id" integer NOT NULL, "district_id" integer NOT NULL, "ward_code" character varying NOT NULL, "is_default" boolean NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_35cd6c3fafec0bb5d072e24ea20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address_user"`);
    }

}
