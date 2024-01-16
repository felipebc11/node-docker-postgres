import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '../../../domain/entity/User';
import { Address } from '../../../domain/entity/Address';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_DB_HOST,
  port: JSON.parse(process.env.PG_DB_PORT ?? '5432'),
  username: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Address, User],
  migrations: ['src/infrastructure/database/postgres/migrations/*.ts'],
  migrationsRun: false,
  subscribers: [],
});
