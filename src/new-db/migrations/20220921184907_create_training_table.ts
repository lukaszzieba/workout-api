import { Kysely, sql } from 'kysely';
import { Database } from 'src/new-db';

export async function up(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema
    .createTable('training')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('short_description', 'text')
    .addColumn('description', 'text')
    .execute();

  await kysely.schema
    .createTable('training_exercise')
    .addColumn('training_id', 'bigint', (col) => col.references('training.id'))
    .addColumn('exercise_id', 'bigint', (col) => col.references('exercise.id'))
    .addPrimaryKeyConstraint('training_exercise_pkey', ['training_id', 'exercise_id'])
    .addColumn('sets', 'integer', (col) => col.notNull())
    .addColumn('reps', 'integer', (col) => col.notNull())
    .addColumn('tempo', 'text')
    .addColumn('reserve', 'text')
    .addColumn('rest', 'text')
    .execute();
}

export async function down(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema.dropTable('training_exercise').execute();
  await kysely.schema.dropTable('training').execute();
}
