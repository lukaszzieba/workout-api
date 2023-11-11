import { Service } from '@types';
import { Users as UserEntity } from '@db/types/generated';

export type User = Pick<UserEntity, 'name' | 'lastname' | 'email'> & {
  id: number;
};
export type TUserEntityI = Pick<UserEntity, 'name' | 'lastname' | 'email' | 'password'>;
export type TUserEntityU = Partial<TUserEntityI>;
export type UserService = Service<User, TUserEntityI, TUserEntityU>;
export type LoginBody = Pick<UserEntity, 'email' | 'password'>;
