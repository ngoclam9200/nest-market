import { MigrationInterface, QueryRunner } from "typeorm";

export class MediaTbl1730280698153 implements MigrationInterface {
    name = 'MediaTbl1730280698153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" RENAME COLUMN "createdAt" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" RENAME COLUMN "created_at" TO "createdAt"`);
    }

}
