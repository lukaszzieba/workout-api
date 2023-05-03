import { Kysely } from 'kysely';
import { Database } from 'src/new-db';

export async function up(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema
    .alterTable('training')
    .addColumn('user_id', 'bigint', (col) => col.defaultTo(1).notNull().references('users.id'))
    .execute();
}

export async function down(kysely: Kysely<Database>): Promise<void> {
  await kysely.schema.alterTable('training').dropColumn('user_id').execute();
}
