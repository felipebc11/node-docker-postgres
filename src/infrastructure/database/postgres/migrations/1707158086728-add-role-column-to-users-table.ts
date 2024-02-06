import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleColumnToUsersTable1707158086728 implements MigrationInterface {
  name = 'AddRoleColumnToUsersTable1707158086728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT \'user\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "role"');
  }
}
