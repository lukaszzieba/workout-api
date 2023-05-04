import { Kysely, sql } from 'kysely';
import { Database } from '@db';

export async function seed(kysely: Kysely<Database>): Promise<void> {
  // Deletes ALL existing entries
  await kysely.deleteFrom('trainingExercise').execute();

  await kysely.deleteFrom('exercise').execute();
  sql`ALTER SEQUENCE exercise_id_seq RESTART WITH 1`.execute(kysely);
  await kysely.deleteFrom('training').execute();
  sql`ALTER SEQUENCE training_id_seq RESTART WITH 1`.execute(kysely);
  await kysely.deleteFrom('plan').execute();
  sql`ALTER SEQUENCE plan_id_seq RESTART WITH 1`.execute(kysely);
  await kysely.deleteFrom('users').execute();
  sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`.execute(kysely);

  // Inserts seed entries
  await kysely
    .insertInto('users')
    .values([
      {
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
    ])
    .execute();

  await kysely
    .insertInto('exercise')
    .values([
      {
        name: 'Wyciskanie sztangi w leżeniu na ławce poziomej',
        shortDescription: 'Kalteczka',
        description: ' Opis jak robić',
        userId: 1,
      },
      {
        name: 'Przysiad ze sztangą z tyłu',
        shortDescription: 'Kopyto',
        description: ' Opis jak robić',
        userId: 1,
      },
      {
        name: 'Martwy ciąg',
        shortDescription: 'Ciąg',
        description: ' Opis jak robić',
        userId: 1,
      },
      {
        name: 'Martwy ciąg sumo',
        shortDescription: 'Ciąg sumo',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Odwrócony motyl na bramie',
        shortDescription: 'Kalteczka',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Wyciskanie żołnierskie hantlami',
        shortDescription: 'Barki',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Wyciskanie żołnierskie',
        shortDescription: 'Barki',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Leg curl',
        shortDescription: 'Kopytko',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Chin ups',
        shortDescription: 'Podciąganko',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Dips',
        shortDescription: 'Dip',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Hip thrust',
        shortDescription: 'Dip',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Wiosłaoanie',
        shortDescription: 'Dip',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Rolling bumbbell Ext.',
        shortDescription: 'Tric',
        description: ' Opis jak robić',
        userId: 2,
      },
      {
        name: 'Uginanie ramion z hantlami',
        shortDescription: 'Tric',
        description: ' Opis jak robić',
        userId: 2,
      },
    ])
    .execute();

  await kysely
    .insertInto('plan')
    .values([
      {
        name: 'Texas 4 days',
        description: 'Bocianowy 4 dniowy tex',
      },
    ])
    .execute();

  await kysely
    .insertInto('training')
    .values([
      {
        name: 'A',
        shortDescription: 'Trening 1',
        description: 'Squat intensity, dead lift volume and accessory',
        userId: 1,
      },
      {
        name: 'B',
        shortDescription: 'Trening 2',
        description: 'Bench press intensity, press volume and accessory',
        userId: 1,
      },
      {
        name: 'C',
        shortDescription: 'Trening 3',
        description: 'Dead lift intensity, sqat volume and accessory',
        userId: 1,
      },
      {
        name: 'D',
        shortDescription: 'Trening 4',
        description: 'Press intensity, bench press volume and accessory',
        userId: 1,
      },
    ])
    .execute();

  await kysely
    .insertInto('trainingExercise')
    .values([
      {
        trainingId: 1,
        exerciseId: 2,
        sets: 1,
        reps: 5,
      },
      {
        trainingId: 1,
        exerciseId: 3,
        sets: 3,
        reps: 5,
      },
      {
        trainingId: 1,
        exerciseId: 7,
        sets: 5,
        reps: 5,
      },
      // B
      {
        trainingId: 2,
        exerciseId: 1,
        sets: 1,
        reps: 5,
      },
      {
        trainingId: 2,
        exerciseId: 6,
        sets: 5,
        reps: 5,
      },
      {
        trainingId: 2,
        exerciseId: 9,
        sets: 4,
        reps: 5,
      },
      {
        trainingId: 2,
        exerciseId: 10,
        sets: 4,
        reps: 10,
      },
      // C
      {
        trainingId: 3,
        exerciseId: 2,
        sets: 1,
        reps: 5,
      },
      {
        trainingId: 3,
        exerciseId: 3,
        sets: 5,
        reps: 5,
      },
      {
        trainingId: 3,
        exerciseId: 11,
        sets: 5,
        reps: 5,
      },
      // // D
      {
        trainingId: 4,
        exerciseId: 6,
        sets: 1,
        reps: 5,
      },
      {
        trainingId: 4,
        exerciseId: 1,
        sets: 5,
        reps: 5,
      },
      {
        trainingId: 4,
        exerciseId: 12,
        sets: 4,
        reps: 5,
      },
      {
        trainingId: 4,
        exerciseId: 13,
        sets: 4,
        reps: 10,
      },
    ])
    .execute();
}
