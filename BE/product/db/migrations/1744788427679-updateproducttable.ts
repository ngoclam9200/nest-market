import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateproducttable1744788427679 implements MigrationInterface {
    name = 'Updateproducttable1744788427679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "unit" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "unit"`);
    }

}
