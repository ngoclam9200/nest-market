import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderTbl1747302318792 implements MigrationInterface {
    name = 'UpdateOrderTbl1747302318792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "product_id" TO "product_ids"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "product_ids"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "product_ids" integer array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "product_ids"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "product_ids" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "product_ids" TO "product_id"`);
    }

}
