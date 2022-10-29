import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (tableBuilder) => {
    tableBuilder.increments('id').primary();
    tableBuilder.date('created_at').defaultTo(knex.fn.now()).notNullable();
    tableBuilder.date('updated_at').defaultTo(knex.fn.now()).notNullable();
    tableBuilder.string('name').notNullable();
    tableBuilder.string('lastname').nullable();
    tableBuilder.string('email').nullable().unique()
    tableBuilder.string('password').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user');
}
