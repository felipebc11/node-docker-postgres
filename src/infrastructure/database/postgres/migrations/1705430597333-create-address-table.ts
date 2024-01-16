import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddressTable1705430597333 implements MigrationInterface {
  name = 'CreateAddressTable1705430597333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zipCode" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "address"');
  }
}
