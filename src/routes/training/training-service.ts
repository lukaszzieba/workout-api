import db from '@db';
import {
  ExerciseForTraining,
  Training,
  TrainingEntity,
  TTrainingEntityI,
  TTrainingEntityU,
} from '@routes/training/types';

const TABLE_NAME = 'training';

const trainingMapper = (
  { id, name, shortDescription, description }: TrainingEntity,
  exercises?: ExerciseForTraining[],
): Training => ({
  id,
  name,
  shortDescription,
  description,
  exercises,
});

const getAll = async () => {
  const all = await db.select('*').from<TrainingEntity>(TABLE_NAME);

  const exercises = await db(TABLE_NAME)
    .join('training_exercise', 'training.id', '=', 'training_exercise.training_id')
    .join('exercise', 'exercise.id', '=', 'training_exercise.exercise_id')
    .whereIn(
      'training.id',
      all.map(({ id }) => id),
    )
    .select<ExerciseForTraining[]>(
      'exercise.id',
      'exercise.name',
      'exercise.short_description',
      'exercise.description',
      'training_exercise.sets',
      'training_exercise.reps',
      'training_exercise.tempo',
      'training_exercise.rest',
    );

  return all.map((a) => trainingMapper(a));
};

const getOne = async (id: number) => {
  const [training] = await db.select('*').from<TrainingEntity>(TABLE_NAME).where({ id });

  const exercise = await db(TABLE_NAME)
    .join('training_exercise', 'training.id', '=', 'training_exercise.training_id')
    .join('exercise', 'exercise.id', '=', 'training_exercise.exercise_id')
    .whereIn('training.id', [training.id])
    .select<ExerciseForTraining[]>(
      'exercise.id',
      'exercise.name',
      'exercise.short_description',
      'exercise.description',
      'training_exercise.sets',
      'training_exercise.reps',
      'training_exercise.tempo',
      'training_exercise.rest',
    );

  return trainingMapper(training, exercise);
};

const create = async (training: TTrainingEntityI) => {
  const [created] = await db<TrainingEntity>(TABLE_NAME)
    .insert({
      ...training,
    })
    .returning('*');

  return trainingMapper(created);
};

const update = async (id: number, training: TTrainingEntityU) => {
  const [updated] = await db(TABLE_NAME)
    .where({ id })
    .update({
      ...training,
    })
    .returning('*');

  return trainingMapper(updated);
};

const deleteOne = async (id: number) => {
  // TODO
  // should cascade to association table
  const [deleted] = await db<TrainingEntity>(TABLE_NAME).where({ id }).delete().returning('*');

  return trainingMapper(deleted);
};

const getByPlanId = async (planId: number) => {
  return await db.select('*').from<TrainingEntity>(TABLE_NAME).where({ planId });
};

export const service = { getAll, getOne, create, update, deleteOne, getByPlanId };
