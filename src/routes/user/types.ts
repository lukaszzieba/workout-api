import { BaseEntity, Service } from '@types';

export type UserEntity = BaseEntity & {
  name: string;
  lastname: string;
  email: string;
  password: string;
};
export type TUserEntityI = Pick<UserEntity, 'name' | 'lastname' | 'email' | 'password'>;
export type TUserEntityU = Partial<TUserEntityI>;

export type UserService = Service<UserEntity, TUserEntityI, TUserEntityU>;

export type User = Pick<UserEntity, 'id' | 'name' | 'lastname' | 'email'>;

export type LoginBody = Pick<UserEntity, 'email' | 'password'>;
