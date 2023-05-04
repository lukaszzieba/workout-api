import { db } from '@db';
import { TUserEntityI, TUserEntityU } from '@routes/user/types';

const TABLE_NAME = 'users';

const getAll = async () => {
  return db
    .selectFrom(TABLE_NAME)
    .select(['id', 'name', 'lastname', 'email', 'password'])
    .execute();
};

const getOne = async (id: number) => {
  return db
    .selectFrom(TABLE_NAME)
    .select(['id', 'name', 'lastname', 'email', 'password'])
    .where('id', '=', id)
    .executeTakeFirst();
};

const create = async (user: TUserEntityI) => {
  return await db
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
  return await db
    .updateTable(TABLE_NAME)
    .set({ ...user })
    .where('id', '=', id)
    .returning(['id', 'name', 'lastname', 'email', 'password'])
    .executeTakeFirst();
};

const deleteOne = async (id: number) => {
  const deleted = await db.deleteFrom(TABLE_NAME).where('id', '=', id).executeTakeFirst();

  if (deleted.numDeletedRows === 0n) {
    return false;
  }

  return true;
};

const getOneByEmail = async (email: string) => {
  const deleted = await db.deleteFrom(TABLE_NAME).where('email', '=', email).executeTakeFirst();

  if (deleted.numDeletedRows === 0n) {
    return false;
  }

  return true;
};

export const service = { getAll, getOne, create, update, deleteOne, getOneByEmail };
