import { newDb } from '../../new-db/index';
import { TUserEntityI, TUserEntityU } from '@routes/user/types';

const TABLE_NAME = 'users';

const getAll = async () => {
  return newDb
    .selectFrom(TABLE_NAME)
    .select(['id', 'name', 'lastname', 'email', 'password'])
    .execute();
};

const getOne = async (id: number) => {
  return newDb
    .selectFrom(TABLE_NAME)
    .select(['id', 'name', 'lastname', 'email', 'password'])
    .where('id', '=', id)
    .executeTakeFirst();
};

const create = async (user: TUserEntityI) => {
  return await newDb
    .insertInto(TABLE_NAME)
    .values({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    })
    .returning(['id', 'name', 'lastname', 'email', 'password'])
    .executeTakeFirst();
};

export const update = async (id: number, user: TUserEntityU) => {
  return await newDb
    .updateTable(TABLE_NAME)
    .set({ ...user })
    .where('id', '=', id)
    .returning(['id', 'name', 'lastname', 'email', 'password'])
    .executeTakeFirst();
};

const deleteOne = async (id: number) => {
  const deleted = await newDb.deleteFrom(TABLE_NAME).where('id', '=', id).executeTakeFirst();

  return deleted.numDeletedRows;
};

const getOneByEmail = async (email: string) => {
  const deleted = await newDb.deleteFrom(TABLE_NAME).where('email', '=', email).executeTakeFirst();

  return deleted.numDeletedRows;
};

export const service = { getAll, getOne, create, update, deleteOne, getOneByEmail };
