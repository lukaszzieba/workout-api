import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('training', (tableBuilder) => {
      tableBuilder.increments('id').primary();
      tableBuilder.date('created_at').defaultTo(knex.fn.now()).notNullable();
      tableBuilder.date('updated_at').defaultTo(knex.fn.now()).notNullable();
      tableBuilder.string('name').notNullable();
      tableBuilder.string('short_description').nullable();
      tableBuilder.string('description').nullable();
    })
    .createTable('training_exercise', (tableBuilder) => {
      tableBuilder.integer('training_id');
      tableBuilder.integer('exercise_id');
      tableBuilder.foreign('training_id').references('id').inTable('training');
      tableBuilder.foreign('exercise_id').references('id').inTable('exercise');
      tableBuilder.primary(['training_id', 'exercise_id'], {
        constraintName: 'training_exercise_pkey',
      });
      tableBuilder.integer('sets').notNullable();
      tableBuilder.integer('reps').notNullable();
      tableBuilder.string('tempo').nullable();
      tableBuilder.string('reserve').nullable();
      tableBuilder.string('rest').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('training_exercise').dropTable('training');
}
