import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateprodtbl1745378019537 implements MigrationInterface {
    name = 'Updateprodtbl1745378019537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "brand" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "products" ADD "origin" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "products" ADD "expiry_date" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "products" ADD "storage_instructions" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "storage_instructions"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "expiry_date"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "origin"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand"`);
    }

}
