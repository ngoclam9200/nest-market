import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateproducttable1744791604088 implements MigrationInterface {
    name = 'Updateproducttable1744791604088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "stock" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "quantity"`);
    }

}
