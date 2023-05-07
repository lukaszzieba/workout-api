import { promises as fs } from 'fs';
import * as path from 'path';
import { CamelCasePlugin, FileMigrationProvider, Kysely, Migrator, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { DB } from '@db/types/generated';
import { seed } from '@db/seed/seed';

const { DB_CLIENT, DB_HOST, DB_PORT, DB_NAME } = process.env;

// You'd create one of these when you start your app.
export const db = new Kysely<DB>({
  // Use MysqlDialect for MySQL and SqliteDialect for SQLite.
  dialect: new PostgresDialect({
    pool: new Pool({
      host: DB_HOST,
      database: DB_NAME,
    }),
  }),
  log: ['query'],
  plugins: [new CamelCasePlugin()],
});

async function migrateToLatest(db: Kysely<DB>) {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  // await db.destroy();
}

// migrateToLatest(db);
// seed(db);
