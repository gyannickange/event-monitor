import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticlesTable1747700807049 implements MigrationInterface {
    name = 'CreateArticlesTable1747700807049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "source" jsonb NOT NULL, "author" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "urlToImage" character varying NOT NULL, "publishedAt" character varying NOT NULL, "content" character varying NOT NULL, "category" character varying NOT NULL DEFAULT 'CRIME', CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
