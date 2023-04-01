import db from '@db';
import { allExerciseQuery, exerciseQuery } from '@routes/exercise/queries';
import {
  Exercise,
  // Exercise,
  ExerciseEntity,
  TExerciseEntityI,
  TExerciseEntityU,
} from '@routes/exercise/types';
import { Knex } from 'knex';
// import { UserEntity } from '@routes/user/types';
// import { service as userService } from '@routes/user/user-service';

const TABLE_NAME = 'exercise';

// const exerciseMapper = (
//   { id, name, description, shortDescription }: ExerciseEntity,
//   user: UserEntity,
// ): Exercise => ({
//   id,
//   name,
//   description,
//   shortDescription,
//   creator: { id: user.id, name: user.name, lastname: user.lastname, email: user.email },
// });

const getAll = async () => {
  // TODO
  // try some data loader for test different approach
  const asd = await db.raw(allExerciseQuery());
  console.log(asd);
  return asd.rows;
};

const getOne = async (id: number) => {
  // const [one] = await db.select('*').from<ExerciseEntity>(TABLE_NAME).where({ id });
  // const user = await userService.getOne(one.userId);
  //
  // return exerciseMapper(one, user);

  const {
    rows: [row],
  } = await db.raw(exerciseQuery(id));

  return row;
};

const create = async (exercise: TExerciseEntityI) => {
  const [created] = await db<ExerciseEntity>(TABLE_NAME)
    .insert({
      ...exercise,
    })
    .returning('*');

  return created;
};

export const update = async (id: number, exercise: TExerciseEntityU) => {
  const [updated] = await db<ExerciseEntity>(TABLE_NAME)
    .where({ id })
    .update({
      ...exercise,
    })
    .returning('*');

  return updated;
};

const deleteOne = async (id: number) => {
  const [deleted] = await db<ExerciseEntity>(TABLE_NAME).where({ id }).delete().returning('*');

  return deleted;
};

export const service = { getAll, getOne, create, update, deleteOne };
