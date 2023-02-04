import db from '@db';
import { TPlanI, TPlanU } from './plan-entity';

const TABLE_NAME = 'plan';

const getAll = async () => {
  const all = await db(TABLE_NAME).select('*');

  return all;
};

const getOne = async (id: number) => {
  const [one] = await db.select('*').from(TABLE_NAME).where({ id });

  return one;
};

const create = async (plan: TPlanI) => {
  const [created] = await db(TABLE_NAME)
    .insert({
      ...plan,
    })
    .returning('*');

  return created;
};

export const update = async (id: number, exercise: TPlanU) => {
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
