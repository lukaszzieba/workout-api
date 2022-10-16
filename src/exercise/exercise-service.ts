import db from '../db';
import { TExerciseI, TExerciseU } from './exercise-entity';

const TABLE_NAME = 'exercise';

export const getAll = async () => {
  const all = await db(TABLE_NAME).select('*');

  return all;
};

export const getOne = async (id: number) => {
  const [one] = await db(TABLE_NAME).where({ id }).select('*');

  return one;
};

export const create = async (exercise: TExerciseI) => {
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

export const deleteOne = async (id: number) => {
  const [deleted] = await db(TABLE_NAME).where({ id }).delete().returning('*');

  return deleted;
};
