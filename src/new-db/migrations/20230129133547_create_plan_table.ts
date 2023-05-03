import { Kysely, sql } from 'kysely';
import { Database } from 'src/new-db';

export async function up(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema
    .createTable('plan')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('user_id', 'bigint', (col) => col.defaultTo(1).notNull().references('user.id'))
    .execute();
}

export async function down(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema.dropTable('plan').execute();
}
