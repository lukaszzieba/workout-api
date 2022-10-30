import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('training_exercise').del();

  await knex('exercise').del();
  await knex.raw('ALTER SEQUENCE exercise_id_seq RESTART WITH 1');

  await knex('training').del();
  await knex.raw('ALTER SEQUENCE training_id_seq RESTART WITH 1');

  await knex('user').del();
  await knex.raw('ALTER SEQUENCE user_id_seq RESTART WITH 1');

  // Inserts seed entries
  await knex('exercise').insert<any>([
    {
      name: 'Wyciskanie sztangi w leżeniu na ławce poziomej',
      short_description: 'Kalteczka',
      description: ' Opis jak robić',
    },
    {
      name: 'Przysiad ze sztangą z tyłu',
      short_description: 'Kopyto',
      description: ' Opis jak robić',
    },
    {
      name: 'Martwy ciąg',
      short_description: 'Ciąg',
      description: ' Opis jak robić',
    },
    {
      name: 'Martwy ciąg sumo',
      short_description: 'Ciąg sumo',
      description: ' Opis jak robić',
    },
    {
      name: 'Odwrócony motyl na bramie',
      short_description: 'Kalteczka',
      description: ' Opis jak robić',
    },
    {
      name: 'Wyciskanie żołnierskie hantlami',
      short_description: 'Barki',
      description: ' Opis jak robić',
    },
  ]);

  await knex('training').insert<any>([
    {
      name: '5x5',
      short_description: 'Kasyczne 5 by 5',
      description: 'Co jak i gdzie',
    },
  ]);

  await knex('training_exercise').insert<any>([
    {
      training_id: 1,
      exercise_id: 1,
      sets: 5,
      reps: 5,
    },
    {
      training_id: 1,
      exercise_id: 2,
      sets: 5,
      reps: 5,
    },
    {
      training_id: 1,
      exercise_id: 3,
      sets: 5,
      reps: 5,
    },
  ]);

  await knex('user').insert<any>([
    {
      name: 'Łuaksz',
      lastname: 'Zięba',
      email: 'asd@asd.com',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$hrcfns+91+z0Q8LJuEnJBg$wh/hbatQS3O0+gu+TSd5PbRV9Tq0DbKobPsUPaFvw2I',
    },
  ]);
}
