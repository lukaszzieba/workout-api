import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import type { Knex } from 'knex';

const { DB_CLIENT, DB_HOST, DB_PORT, DB_NAME } = process.env;

const migrations: Knex.MigratorConfig = {
  tableName: 'migrations',
  extension: 'ts',
  directory: './migrations',
};

const seed: Knex.SeederConfig = {
  directory: './seeds/dev',
};

const config: Knex.Config = {
  client: DB_CLIENT,
  connection: {
    port: Number(DB_PORT),
    host: DB_HOST,
    database: DB_NAME,
  },
  ...migrations,
  ...seed,
};

module.exports = config;
