import { Kysely, sql } from 'kysely';
import { Database } from '@db';

export async function up(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema
    .createTable('plan')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('user_id', 'integer', (col) => col.defaultTo(1).notNull().references('users.id'))
    .execute();
}

export async function down(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema.dropTable('plan').execute();
}
