import { promises as fs } from 'fs';
import * as path from 'path';
import { CamelCasePlugin, FileMigrationProvider, Kysely, Migrator, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { ExerciseEntity } from '@routes/exercise/types';
import { TrainingEntity } from '@routes/training/types';
import { UserEntity } from '@routes/user/types';
import { PlanEntity } from '@routes/plan/types';

interface TrainingExercise {
  trainingId: number;
  exerciseId: number;
  name: string;
  sets: number;
  reps: number;
  tempo: string | null;
  reserve: string | null;
  rest: string | null;
}

export interface Database {
  exercise: ExerciseEntity;
  training: TrainingEntity;
  users: UserEntity;
  trainingExercise: TrainingExercise;
  plan: PlanEntity;
}

const { DB_CLIENT, DB_HOST, DB_PORT, DB_NAME } = process.env;

// You'd create one of these when you start your app.
export const newDb = new Kysely<Database>({
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

async function migrateToLatest(db: Kysely<Database>) {
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

  await db.destroy();
}

migrateToLatest(newDb);
