import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return  knex.schema.createTable('exercises', (tableBuilder) => {
        tableBuilder.increments('id');
        tableBuilder.date('created_at').defaultTo(knex.fn.now())
        tableBuilder.date('updated_at').defaultTo(knex.fn.now())
        tableBuilder.string('name')
        tableBuilder.string('short_name');
        tableBuilder.string('description');
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('exercises');
}

