import { MigrationInterface, QueryRunner } from "typeorm";

export class Bannertable1744884057822 implements MigrationInterface {
    name = 'Bannertable1744884057822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "media_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id_created" integer NOT NULL, "user_id_updated" integer NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "banner"`);
    }

}
