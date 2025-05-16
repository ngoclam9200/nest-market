import { MigrationInterface, QueryRunner } from "typeorm";

export class InitOrderTbl1747211844843 implements MigrationInterface {
    name = 'InitOrderTbl1747211844843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "user_id" integer NOT NULL, "address_user_id" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "status" integer NOT NULL DEFAULT '0', "transaction_type" integer NOT NULL DEFAULT '0', "total_price" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
