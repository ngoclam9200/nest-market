import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderTbl1747378798241 implements MigrationInterface {
    name = 'UpdateOrderTbl1747378798241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "product_ids" TO "products"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "products"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "products" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "products"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "products" integer array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "products" TO "product_ids"`);
    }

}
