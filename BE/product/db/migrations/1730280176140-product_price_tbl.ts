import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductPriceTbl1730280176140 implements MigrationInterface {
    name = 'ProductPriceTbl1730280176140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_price" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "product_id" integer NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT now(), "end_date" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id_created" integer NOT NULL, "user_id_updated" integer NOT NULL, CONSTRAINT "PK_039c4320ccd5ede07440f499268" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_price"`);
    }

}
