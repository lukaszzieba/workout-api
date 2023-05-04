import { db } from '@db';
import { TPlanI, TPlanU } from '@routes/plan/types';

const TABLE_NAME = 'plan';

const getAll = async () => {
  const all = await db
    .selectFrom(TABLE_NAME)
    .select(['id', 'name', 'description', 'createdAt', 'updatedAt'])
    .execute();

  return all;
};

const getOne = async (id: number) => {
  const one = await db
    .selectFrom(TABLE_NAME)
    .where('id', '=', id)
    .select(['id', 'name', 'description', 'createdAt', 'updatedAt'])
    .executeTakeFirst();

  return one;
};

const create = async (plan: TPlanI) => {
  const created = await db
    .insertInto(TABLE_NAME)
    .values({ ...plan })
    .returning(['id', 'name', 'description', 'createdAt', 'updatedAt'])
    .executeTakeFirst();

  return created;
};

export const update = async (id: number, plan: TPlanU) => {
  const updated = await db
    .updateTable(TABLE_NAME)
    .set({ ...plan })
    .where('id', '=', id)
    .returning(['id', 'name', 'description', 'createdAt', 'updatedAt'])
    .executeTakeFirst();

  return updated;
};

const deleteOne = async (id: number) => {
  const deleted = await db.deleteFrom(TABLE_NAME).where('id', '=', id).executeTakeFirst();

  if (deleted.numDeletedRows === 0n) {
    return false;
  }

  return true;
};

export const service = { getAll, getOne, create, update, deleteOne };
