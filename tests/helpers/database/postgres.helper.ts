import { Pool } from 'pg';

import { PostgresConnection } from '../../../src/infrastructure/database/postgres/postgres-connection';

const config = {
  user: process.env.PG_DB_USER,
  host: process.env.PG_DB_HOST,
  password: process.env.PG_DB_PASSWORD,
  port: Number(process.env.PG_DB_PORT),
};

const connection = new Pool(config);
const database = process.env.PG_DB_NAME;

export const dropDB = () => {
  connection.query(`DROP DATABASE "${database}"`, (err) => {
    if (err) {
      throw new Error(`trying drop database \n >> ${err} << \n`);
    }
  });
};

export const createDB = () => {
  connection.query(`CREATE DATABASE "${database}"`, (err) => {
    if (err) {
      if (err.message !== `database "${database}" already exists`)
        throw new Error(`trying create database \n >> ${err} << \n`);
    }
  });
};

export const cleanDatabase = async () => {
  const pgDatabase = new PostgresConnection();
  const postgresConnection = await pgDatabase.getConnection();
  const entities = postgresConnection.entityMetadatas;

  for (const entity of entities) {
    try {
      await postgresConnection.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
    } catch (error) {
      console.error('Error on truncate table', error);
    }
  }
};

export const insertDefaultSeeds = async () => {
  const pgDatabase = new PostgresConnection();
  const postgresConnection = await pgDatabase.getConnection();

  const seeds = [
    `INSERT INTO public."user"(
      uuid, "firstName", "lastName", "bornDate", "documentNumber", "documentType", email, password, role)
      VALUES (
        default, 
        'Felipe', 
        'Cruz Bastos', 
        '1998-10-31', 
        '074510', 
        'CPF', 
        '${process.env.ADMIN_USER_EMAIL}', 
        '$2y$10$qDCPXemecVO8u/NANRO5L.KZsI/ydwJ9h.ieqnf//nWgEZvapvSvW', 
        'ADMIN'
        );`,
  ];

  for (const seed of seeds) {
    try {
      await postgresConnection.query(seed);
    } catch (error) {
      console.error('Error on insert seed', error);
    }
  }
};
