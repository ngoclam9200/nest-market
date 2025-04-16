import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateusertbl1719808450784 implements MigrationInterface {
    name = 'Updateusertbl1719808450784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "access_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "access_token"`);
    }

}
