import type { Knex } from 'knex';

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const DB_CLIENT = 'pg';
const DEFAULT_DB_PORT = 5432;

const migrations = {
  tableName: 'migrations',
  extension: 'ts',
  directory: './migrations',
};

const getDbPort = () => Number(DB_PORT) || DEFAULT_DB_PORT;

const config: Knex.Config = {
  client: DB_CLIENT,
  connection: {
    port: getDbPort(),
    host: DB_HOST,
    database: DB_NAME,
  },
  ...migrations,
};

module.exports = config;
