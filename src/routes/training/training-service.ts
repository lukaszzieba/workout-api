import db from '@db';
import {
  ExerciseForTraining,
  Training,
  TTrainingEntityI,
  TTrainingEntityU,
} from '@routes/training/types';

import { newDb } from 'src/new-db';
const TABLE_NAME = 'training';

const trainingMapper = (
  { id, name, shortDescription, description, updatedAt, createdAt }: Training,
  exercises?: ExerciseForTraining[],
): Training => ({
  id,
  name,
  updatedAt,
  createdAt,
  shortDescription,
  description,
  exercises,
});

const getAll = async () => {
  const all = await newDb
    .selectFrom(TABLE_NAME)
    .select(['id', 'name', 'shortDescription', 'description', 'createdAt', 'updatedAt'])
    .execute();

  const e = await newDb
    .selectFrom('trainingExercise')
    .innerJoin('exercise', 'exercise.id', 'trainingExercise.exerciseId')
    .where(
      'trainingId',
      'in',
      all.map(({ id }) => id),
    )
    .select([
      'exercise.id',
      'exercise.name',
      'exercise.shortDescription',
      'exercise.description',
      'trainingExercise.sets',
      'trainingExercise.reps',
      'trainingExercise.tempo',
      'trainingExercise.rest',
    ])
    .execute();

  return all.map((a) => trainingMapper(a, e));
};

const getOne = async (id: number) => {
  const training = await newDb
    .selectFrom(TABLE_NAME)
    .where('id', '=', id)
    .select(['id', 'name', 'shortDescription', 'description', 'createdAt', 'updatedAt'])
    .executeTakeFirst();

  const exercise = await newDb
    .selectFrom('trainingExercise')
    .innerJoin('exercise', 'exercise.id', 'trainingExercise.exerciseId')
    .where('trainingId', '=', id)
    .select([
      'exercise.id',
      'exercise.name',
      'exercise.shortDescription',
      'exercise.description',
      'trainingExercise.sets',
      'trainingExercise.reps',
      'trainingExercise.tempo',
      'trainingExercise.rest',
    ])
    .execute();

  if (!training) {
    return undefined;
  }

  return trainingMapper(training, exercise);
};

const create = async (training: TTrainingEntityI) => {
  const created = await newDb
    .insertInto(TABLE_NAME)
    .values({
      name: training.name,
      shortDescription: training.shortDescription,
      description: training.description,
    })
    .returning(['id', 'name', 'shortDescription', 'description', 'createdAt', 'updatedAt'])
    .executeTakeFirst();

  if (!created) {
    return undefined;
  }

  return trainingMapper(created);
};

const update = async (id: number, training: TTrainingEntityU) => {
  const updated = await newDb
    .updateTable(TABLE_NAME)
    .set({
      ...training,
    })
    .where('id', '=', id)
    .returning(['id', 'name', 'shortDescription', 'description', 'createdAt', 'updatedAt'])
    .executeTakeFirst();

  if (!updated) {
    return undefined;
  }

  return trainingMapper(updated);
};

const deleteOne = async (id: number) => {
  // TODO
  // should cascade to association table
  const deleted = await newDb.deleteFrom(TABLE_NAME).where('id', '=', id).executeTakeFirst();

  return deleted.numDeletedRows;
};

const getByPlanId = async (planId: number) => {
  const trainig = await newDb
    .selectFrom('training')
    .select(['id', 'name', 'shortDescription', 'description', 'createdAt', 'updatedAt'])
    .where('planId', '=', planId)
    .executeTakeFirst();

  if (!trainig) {
    return undefined;
  }

  const exercise = await newDb
    .selectFrom('trainingExercise')
    .innerJoin('exercise', 'exercise.id', 'trainingExercise.exerciseId')
    .where('trainingId', '=', trainig.id)
    .select([
      'exercise.id',
      'exercise.name',
      'exercise.shortDescription',
      'exercise.description',
      'trainingExercise.sets',
      'trainingExercise.reps',
      'trainingExercise.tempo',
      'trainingExercise.rest',
    ])
    .execute();

  return trainingMapper(trainig, exercise);
};

export const service = { getAll, getOne, create, update, deleteOne, getByPlanId };
