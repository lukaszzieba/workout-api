import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('plan', (tableBuilder) => {
      tableBuilder.increments('id').primary();
      tableBuilder.date('created_at').defaultTo(knex.fn.now()).notNullable();
      tableBuilder.date('updated_at').defaultTo(knex.fn.now()).notNullable();
      tableBuilder.string('name').notNullable();
      tableBuilder.string('description').notNullable();
      tableBuilder.integer('user_id').defaultTo(1).notNullable();
      tableBuilder.foreign('user_id').references('users.id');
    })
    .alterTable('training', (trainingTableBulder) => {
      trainingTableBulder.integer('plan_id').unsigned();
      trainingTableBulder.foreign('plan_id').references('plan.id');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('training', (tb) => {
      tb.dropForeign('plan_id');
      tb.dropColumns('plan_id');
    })
    .dropTable('plan');
}
