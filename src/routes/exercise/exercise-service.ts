import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { db } from '@db';
import { TExerciseEntityI, TExerciseEntityU } from '@routes/exercise/types';

const TABLE_NAME = 'exercise';

const getAll = async () => {
  const a = await db
    .selectFrom(TABLE_NAME)
    .innerJoin('users', 'users.id', 'exercise.userId')
    .select((eb) => [
      'exercise.id',
      'exercise.createdAt',
      'exercise.updatedAt',
      'exercise.name',
      'exercise.description',
      'exercise.shortDescription',
      // sql<User>`(select row_to_json(users) from (select id, created_at, updated_at, name, lastname, email from users u where id = 1) as users)`.as(
      //   'creator',
      // ),
      // sql<User>`jsonb_build_object('id', users.id, 'name', users.name, 'lastname', users.lastname, 'email', users.email )`.as(
      //   'creator',
      // ),
      jsonObjectFrom(
        eb
          .selectFrom('users')
          .select(['users.id', 'users.name', 'users.lastname', 'users.email'])
          .whereRef('exercise.userId', '=', 'users.id'),
      ).as('creator'),
    ])
    .execute();

  return a;
};

const getOne = async (id: number) => {
  return await db
    .selectFrom(TABLE_NAME)
    .innerJoin('users', 'users.id', 'exercise.userId')
    .select((eb) => [
      'exercise.id',
      'exercise.createdAt',
      'exercise.updatedAt',
      'exercise.name',
      'exercise.description',
      'exercise.shortDescription',
      jsonObjectFrom(
        eb
          .selectFrom('users')
          .select(['users.id', 'users.name', 'users.lastname', 'users.email'])
          .whereRef('exercise.userId', '=', 'users.id'),
      ).as('creator'),
    ])
    .where('exercise.id', '=', id)
    .executeTakeFirst();
};

const create = async (exercise: TExerciseEntityI) => {
  // TODO: get userId from req session
  return await db
    .insertInto(TABLE_NAME)
    .values({
      name: exercise.name,
      description: exercise.description,
      shortDescription: exercise.shortDescription,
      userId: 1,
    })
    .returning((eb) => [
      'id',
      'createdAt',
      'updatedAt',
      'name',
      'description',
      'shortDescription',
      jsonObjectFrom(
        eb
          .selectFrom('users')
          .select(['users.id', 'users.name', 'users.lastname', 'users.email'])
          .whereRef('exercise.userId', '=', 'users.id'),
      ).as('creator'),
    ])
    .executeTakeFirst();
};

export const update = async (id: number, exercise: TExerciseEntityU) => {
  return await db
    .updateTable(TABLE_NAME)
    .set({ ...exercise })
    .where('id', '=', id)
    .returning((eb) => [
      'id',
      'createdAt',
      'updatedAt',
      'name',
      'description',
      'shortDescription',
      jsonObjectFrom(
        eb
          .selectFrom('users')
          .select(['users.id', 'users.name', 'users.lastname', 'users.email'])
          .whereRef('exercise.userId', '=', 'users.id'),
      ).as('creator'),
    ])
    .executeTakeFirst();
};

const deleteOne = async (id: number) => {
  const deleted = await db.deleteFrom(TABLE_NAME).where('id', '=', id).executeTakeFirst();

  if (deleted.numDeletedRows === 0n) {
    return false;
  }

  return true;
};

export const service = { getAll, getOne, create, update, deleteOne };
