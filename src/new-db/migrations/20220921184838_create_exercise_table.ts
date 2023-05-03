import { Kysely, sql } from 'kysely';
import { Database } from 'src/new-db';

export async function up(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema
    .createTable('exercise')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('short_description', 'text')
    .addColumn('description', 'text')
    .execute();
}

export async function down(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema.dropTable('exercise').execute();
}
