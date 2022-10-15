import kenx from '../db';
import { TTrainingI, TTrainingU } from './training-entity';

const TABLE_NAME = 'training';

export const getAll = async () => {
  const all = await kenx(TABLE_NAME).select('*');

  return all;
};

export const getOne = async (id: number) => {
  const [one] = await kenx(TABLE_NAME).where({ id }).select('*');
  // const { rows: exercises } =
  //     await kenx.raw(`select e."name" , e.short_description, e.description, te."sets" , te.reps , te.tempo  from training t
  // join training_exercise te on te.training_id = t.id
  // join exercise e on e.id  = te.exercise_id;`);
  const exercise = await kenx(TABLE_NAME)
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

  console.log(exercise)

  return {...one, exercise};
};

export const create = async (training: TTrainingI) => {
  const [created] = await kenx(TABLE_NAME)
    .insert({
      ...training,
    })
    .returning('*');

  return created;
};

export const update = async (training: TTrainingU) => {
  const [updated] = await kenx(TABLE_NAME)
    .where({ id: training.id })
    .update({
      ...training,
    })
    .returning('*');

  return updated;
};

export const deleteOne = async (id: number) => {
  const [deleted] = await kenx(TABLE_NAME).where({ id }).delete().returning('*');

  return deleted;
};
