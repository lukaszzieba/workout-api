import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

const { DB_CLIENT, DB_HOST, DB_PORT, DB_NAME } = process.env;

const migrations = {
  tableName: 'migrations',
  extension: 'ts',
  directory: './migrations',
};

const config: Knex.Config = {
  client: DB_CLIENT,
  connection: {
    port: Number(DB_PORT),
    host: DB_HOST,
    database: DB_NAME,
  },
  ...migrations,
};

module.exports = config;
