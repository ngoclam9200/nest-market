import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateusertable1745048713489 implements MigrationInterface {
    name = 'Updateusertable1745048713489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "branch_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "branch_id" integer NOT NULL DEFAULT '0'`);
    }

}
