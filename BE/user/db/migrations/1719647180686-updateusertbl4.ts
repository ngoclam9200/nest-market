import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateusertbl41719647180686 implements MigrationInterface {
    name = 'Updateusertbl41719647180686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP DEFAULT`);
    }

}
