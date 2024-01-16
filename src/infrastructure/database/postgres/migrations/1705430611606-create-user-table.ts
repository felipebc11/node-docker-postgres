import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1705430611606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "bornDate" TIMESTAMP NOT NULL, "documentNumber" character varying NOT NULL, "documentType" character varying NOT NULL, "address_id" integer, CONSTRAINT "REL_302d96673413455481d5ff4022" UNIQUE ("address_id"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))',
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"');
    await queryRunner.query('DROP TABLE "user"');
  }
}
