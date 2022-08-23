import kenx from '../db';
import { TExerciseI, TExerciseU } from './exercise-entity';

const TABLE_NAME = 'exercise';

export const getAll = async () => {
  const all = await kenx(TABLE_NAME).select('*');

  return all;
};

export const getOne = async (id: number) => {
  const [one] = await kenx(TABLE_NAME).where({ id }).select('*');

  return one;
};

export const create = async (exercise: TExerciseI) => {
  const [created] = await kenx(TABLE_NAME)
    .insert({
      ...exercise,
    })
    .returning('*');

  return created;
};

export const update = async (exercise: TExerciseU) => {
  const [updated] = await kenx(TABLE_NAME)
    .where({ id: exercise.id })
    .update({
      ...exercise,
    })
    .returning('*');

  return updated;
};

export const deleteOne = async (id: number) => {
  const [deleted] = await kenx(TABLE_NAME).where({ id }).delete().returning('*');

  return deleted;
};
