import { Kysely } from 'kysely';
import { Database } from 'src/new-db';

export async function up(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema
    .alterTable('exercise')
    .addColumn('user_id', 'bigint', (col) => col.defaultTo(1).notNull().references('user.id'))
    .execute();
}

export async function down(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema.alterTable('exercise').dropColumn('user_id').execute();
}
