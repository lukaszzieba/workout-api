import db from '@db';
import { TExerciseI, TExerciseU } from './exercise-entity';

const TABLE_NAME = 'exercise';

const getAll = async () => {
  const all = await db(TABLE_NAME).select('*');

  return all;
};

const getOne = async (id: number) => {
  const [one] = await db(TABLE_NAME).where({ id }).select('*');

  return one;
};

const create = async (exercise: TExerciseI) => {
  const [created] = await db(TABLE_NAME)
    .insert({
      ...exercise,
    })
    .returning('*');

  return created;
};

export const update = async (id: number, exercise: TExerciseU) => {
  const [updated] = await db(TABLE_NAME)
    .where({ id })
    .update({
      ...exercise,
    })
    .returning('*');

  return updated;
};

const deleteOne = async (id: number) => {
  const [deleted] = await db(TABLE_NAME).where({ id }).delete().returning('*');

  return deleted;
};

export const service = { getAll, getOne, create, update, deleteOne };
