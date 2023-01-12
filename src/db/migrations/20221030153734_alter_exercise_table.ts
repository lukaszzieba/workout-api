import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('exercise', (tableBuilder) => {
    tableBuilder.integer('user_id').defaultTo(1).notNullable();
    tableBuilder.foreign('user_id').references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('exercise', (tableBuilder) => {
    tableBuilder.dropForeign('user_id');
    tableBuilder.dropColumns('user_id');
  });
}
