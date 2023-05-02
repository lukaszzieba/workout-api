import { Generated } from 'kysely';
import { Service } from '@types';

export type UserEntity = {
  id: Generated<number>;
  createdAt: Generated<string>;
  updatedAt: Generated<string>;
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export type User = Pick<UserEntity, 'name' | 'lastname' | 'email' | 'password'> & {
  id: number;
};
export type TUserEntityI = Pick<UserEntity, 'name' | 'lastname' | 'email' | 'password'>;
export type TUserEntityU = Partial<TUserEntityI>;
export type UserService = Service<User, TUserEntityI, TUserEntityU>;
export type LoginBody = Pick<UserEntity, 'email' | 'password'>;
