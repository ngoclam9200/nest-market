import { MigrationInterface, QueryRunner } from "typeorm";

export class MediaTbl1730284548553 implements MigrationInterface {
    name = 'MediaTbl1730284548553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" RENAME COLUMN "isDeleted" TO "status"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "media" ADD "status" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "media" ADD "status" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "media" RENAME COLUMN "status" TO "isDeleted"`);
    }

}
