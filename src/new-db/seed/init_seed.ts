import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('training_exercise').del();

  await knex('exercise').del();
  await knex.raw('ALTER SEQUENCE exercise_id_seq RESTART WITH 1');

  await knex('training').del();
  await knex.raw('ALTER SEQUENCE training_id_seq RESTART WITH 1');

  await knex('plan').del();
  await knex.raw('ALTER SEQUENCE plan_id_seq RESTART WITH 1');

  await knex('users').del();
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  // Inserts seed entries
  await knex('users').insert<any>([
    {
      id: 1,
      name: 'Łuaksz',
      lastname: 'Zięba',
      email: 'asd@asd.com',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$hrcfns+91+z0Q8LJuEnJBg$wh/hbatQS3O0+gu+TSd5PbRV9Tq0DbKobPsUPaFvw2I',
    },
    {
      id: 2,
      name: 'Luke',
      lastname: 'Stork',
      email: 'zxck@zxc.com',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$hrcfns+91+z0Q8LJuEnJBg$wh/hbatQS3O0+gu+TSd5PbRV9Tq0DbKobPsUPaFvw2I',
    },
  ]);

  await knex
    .insert<any>([
      {
        name: 'Wyciskanie sztangi w leżeniu na ławce poziomej',
        short_description: 'Kalteczka',
        description: ' Opis jak robić',
        user_id: 1,
      },
      {
        name: 'Przysiad ze sztangą z tyłu',
        short_description: 'Kopyto',
        description: ' Opis jak robić',
        user_id: 1,
      },
      {
        name: 'Martwy ciąg',
        short_description: 'Ciąg',
        description: ' Opis jak robić',
        user_id: 1,
      },
      {
        name: 'Martwy ciąg sumo',
        short_description: 'Ciąg sumo',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Odwrócony motyl na bramie',
        short_description: 'Kalteczka',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Wyciskanie żołnierskie hantlami',
        short_description: 'Barki',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Wyciskanie żołnierskie',
        short_description: 'Barki',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Leg curl',
        short_description: 'Kopytko',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Chin ups',
        short_description: 'Podciąganko',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Dips',
        short_description: 'Dip',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Hip thrust',
        short_description: 'Dip',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Wiosłaoanie',
        short_description: 'Dip',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Rolling bumbbell Ext.',
        short_description: 'Tric',
        description: ' Opis jak robić',
        user_id: 2,
      },
      {
        name: 'Uginanie ramion z hantlami',
        short_description: 'Tric',
        description: ' Opis jak robić',
        user_id: 2,
      },
    ])
    .table('exercise');

  await knex
    .insert([
      {
        name: 'Texas 4 days',
        description: 'Bocianowy 4 dniowy tex',
        user_id: 1,
      },
    ])
    .table('plan');

  await knex
    .insert<any>([
      {
        name: 'A',
        short_description: 'Trening 1',
        description: 'Squat intensity, dead lift volume and accessory',
        user_id: 1,
        plan_id: 1,
      },
      {
        name: 'B',
        short_description: 'Trening 2',
        description: 'Bench press intensity, press volume and accessory',
        user_id: 1,
        plan_id: 1,
      },
      {
        name: 'C',
        short_description: 'Trening 3',
        description: 'Dead lift intensity, sqat volume and accessory',
        user_id: 1,
        plan_id: 1,
      },
      {
        name: 'D',
        short_description: 'Trening 4',
        description: 'Press intensity, bench press volume and accessory',
        user_id: 1,
        plan_id: 1,
      },
    ])
    .table('training');

  await knex('training_exercise').insert<any>([
    // A
    {
      training_id: 1,
      exercise_id: 2,
      sets: 1,
      reps: 5,
    },
    {
      training_id: 1,
      exercise_id: 3,
      sets: 3,
      reps: 5,
    },
    {
      training_id: 1,
      exercise_id: 7,
      sets: 5,
      reps: 5,
    },
    // B
    {
      training_id: 2,
      exercise_id: 1,
      sets: 1,
      reps: 5,
    },
    {
      training_id: 2,
      exercise_id: 6,
      sets: 5,
      reps: 5,
    },
    {
      training_id: 2,
      exercise_id: 9,
      sets: 4,
      reps: 5,
    },
    {
      training_id: 2,
      exercise_id: 10,
      sets: 4,
      reps: 10,
    },
    // C
    {
      training_id: 3,
      exercise_id: 2,
      sets: 1,
      reps: 5,
    },
    {
      training_id: 3,
      exercise_id: 3,
      sets: 5,
      reps: 5,
    },
    {
      training_id: 3,
      exercise_id: 11,
      sets: 5,
      reps: 5,
    },
    // // D
    {
      training_id: 4,
      exercise_id: 6,
      sets: 1,
      reps: 5,
    },
    {
      training_id: 4,
      exercise_id: 1,
      sets: 5,
      reps: 5,
    },
    {
      training_id: 4,
      exercise_id: 12,
      sets: 4,
      reps: 5,
    },
    {
      training_id: 4,
      exercise_id: 13,
      sets: 4,
      reps: 10,
    },
  ]);
}
