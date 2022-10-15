import db from '../db';
import { TTrainingI, TTrainingU } from './training-entity';

const TABLE_NAME = 'training';

export const getAll = async () => {
  const all = await db(TABLE_NAME).select('*');

  return all;
};

export const getOne = async (id: number) => {
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

export const create = async (training: TTrainingI) => {
  const [created] = await db(TABLE_NAME)
    .insert({
      ...training,
    })
    .returning('*');

  return created;
};

// TODO
// Update dont work
export const update = async (training: TTrainingU) => {
  const [updated] = await db(TABLE_NAME)
    .where({ id: training.id })
    .update({
      ...training,
    })
    .returning('*');

  return updated;
};

export const deleteOne = async (id: number) => {
  const [deleted] = await db(TABLE_NAME).where({ id }).delete().returning('*');

  return deleted;
};
