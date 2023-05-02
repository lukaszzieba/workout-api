import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { ExerciseEntity } from '@routes/exercise/types';
import { TrainingEntity } from '@routes/training/types';
import { UserEntity } from '@routes/user/types';

interface Database {
  exercise: ExerciseEntity;
  training: TrainingEntity;
  users: UserEntity;
  trainingExercise: TrainingEntity;
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
