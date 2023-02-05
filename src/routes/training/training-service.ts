import db from '@db';
import {
  ExerciseForTraining,
  Training,
  TrainingEntity,
  TrainingService,
  TTrainingEntityI,
  TTrainingEntityU,
} from '@routes/training/types';

const TABLE_NAME = 'training';

const trainingMapper = (
  { id, name, shortDescription, description }: TrainingEntity,
  exercises: ExerciseForTraining[],
): Training => ({
  id,
  name,
  shortDescription,
  description,
  exercises,
});

const getAll = async () => {
  const all = await db('training').select('*');

  return all;
};

const getOne = async (id: number) => {
  const [training] = await db(TABLE_NAME).where({ id }).select('*');

  const exercise = await db<ExerciseForTraining>(TABLE_NAME)
    .join('training_exercise', 'training.id', '=', 'training_exercise.training_id')
    .join('exercise', 'exercise.id', '=', 'training_exercise.exercise_id')
    .where({ trainingId: training.id })
    .select(
      'exercise.id',
      'exercise.name',
      'exercise.short_description',
      'exercise.description',
      'training_exercise.sets',
      'training_exercise.reps',
      'training_exercise.tempo',
    );

  return trainingMapper(training, exercise);
};

const create = async (training: TTrainingEntityI): Promise<Training> => {
  const [created] = await db(TABLE_NAME)
    .insert({
      ...training,
    })
    .returning('*');

  return created;
};

const update = async (id: number, training: TTrainingEntityU) => {
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

const getByPlanId = async (planId: number) => {
  return await db.select('*').from(TABLE_NAME).where({ planId });
};

export const service: TrainingService = { getAll, getOne, create, update, deleteOne, getByPlanId };
