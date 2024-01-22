import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '../../../domain/entity/User';
import { Address } from '../../../domain/entity/Address';

const isDevEnvironment = process.env.NODE_ENV === 'development';

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
  migrations: [
    isDevEnvironment
      ? 'src/infrastructure/database/postgres/migrations/*.ts'
      : 'build/src/infrastructure/database/postgres/migrations/*.js',
  ],
  migrationsRun: false,
  subscribers: [],
});
