import { Pool } from 'pg';

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
