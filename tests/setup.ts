import 'reflect-metadata';

import { startHttpServer, stopHttpServer } from './helpers/http-server';
import { cleanDatabase, insertDefaultSeeds } from './helpers/database/postgres.helper';

beforeAll(async () => {
  await startHttpServer();
  await insertDefaultSeeds();
});

afterAll(async () => {
  await cleanDatabase();
  stopHttpServer();
});
