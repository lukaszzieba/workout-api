import { Kysely, sql } from 'kysely';
import { Database } from '@db';

export async function up(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema
    .createTable('users')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('lastname', 'text')
    .addColumn('email', 'text', (col) => col.unique())
    .addColumn('password', 'text')
    .execute();
}

export async function down(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema.dropTable('users').execute();
}
