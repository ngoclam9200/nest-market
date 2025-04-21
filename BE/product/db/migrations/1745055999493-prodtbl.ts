import { MigrationInterface, QueryRunner } from "typeorm";

export class Prodtbl1745055999493 implements MigrationInterface {
    name = 'Prodtbl1745055999493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "branch_id" TO "rating"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" double precision NOT NULL DEFAULT '3.5'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "branch_id" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "rating" TO "branch_id"`);
    }

}
