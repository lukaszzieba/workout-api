import db from '@db';
import { TUserEntityI, TUserEntityU, UserEntity } from '@routes/user/types';

const TABLE_NAME = 'users';

const getAll = async () => {
  const all = await db.select('*').from<UserEntity>(TABLE_NAME);

  return all;
};

const getOne = async (id: number) => {
  const [one] = await db.select('*').from<UserEntity>(TABLE_NAME).where({ id });

  return one;
};

const create = async (user: TUserEntityI) => {
  const [created] = await db<UserEntity>(TABLE_NAME)
    .insert({
      ...user,
    })
    .returning('*');

  return created;
};

export const update = async (id: number, user: TUserEntityU) => {
  const [updated] = await db<UserEntity>(TABLE_NAME)
    .where({ id })
    .update({
      ...user,
    })
    .returning('*');
  return updated;
};

const deleteOne = async (id: number) => {
  const [deleted] = await db<UserEntity>(TABLE_NAME).where({ id }).delete().returning('*');

  return deleted;
};

const getOneByEmail = async (email: string) => {
  const [one] = await db.select('*').from(TABLE_NAME).where({ email });

  return one;
};

export const service = { getAll, getOne, create, update, deleteOne, getOneByEmail };
