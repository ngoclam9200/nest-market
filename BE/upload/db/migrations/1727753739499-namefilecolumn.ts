import { MigrationInterface, QueryRunner } from "typeorm";

export class Namefilecolumn1727753739499 implements MigrationInterface {
    name = 'Namefilecolumn1727753739499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "name" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "name"`);
    }

}
