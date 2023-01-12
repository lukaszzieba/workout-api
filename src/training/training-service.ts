import db from '../db';
import { TTrainingI, TTrainingU } from './training-entity';

const TABLE_NAME = 'training';

const getAll = async () => {
  const all = await db(TABLE_NAME).select('*');

  return all;
};

const getOne = async (id: number) => {
  const [one] = await db(TABLE_NAME).where({ id }).select('*');

  const exercise = await db(TABLE_NAME)
    .join('training_exercise', 'training.id', '=', 'training_exercise.training_id')
    .join('exercise', 'exercise.id', '=', 'training_exercise.exercise_id')
    .select(
      'exercise.name',
      'exercise.short_description',
      'exercise.description',
      'training_exercise.sets',
      'training_exercise.reps',
      'training_exercise.tempo',
    );

  return { ...one, exercise };
};

const create = async (training: TTrainingI) => {
  const [created] = await db(TABLE_NAME)
    .insert({
      ...training,
    })
    .returning('*');

  return created;
};

const update = async (id: number, training: TTrainingU) => {
  const [updated] = await db(TABLE_NAME)
    .where({ id })
    .update({
      ...training,
    })
    .returning('*');

  return updated;
};

const deleteOne = async (id: number) => {
  // TODO
  // should cascade to association table
  const [deleted] = await db(TABLE_NAME).where({ id }).delete().returning('*');

  return deleted;
};

export const service = { getAll, getOne, create, update, deleteOne };
