import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('exercise', (tableBuilder) => {
    tableBuilder.increments('id').primary();
    tableBuilder.date('created_at').defaultTo(knex.fn.now());
    tableBuilder.date('updated_at').defaultTo(knex.fn.now());
    tableBuilder.string('name').notNullable();
    tableBuilder.string('short_description').nullable();
    tableBuilder.string('description').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('exercise');
}
