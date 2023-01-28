import { BaseEntity } from '@types';

export type User = BaseEntity & {
  name: string;
  lastname: string;
  email: string;
  password?: string;
};

export type TUserI = Pick<User, 'name' | 'lastname' | 'email' | 'password'> &
  Partial<Pick<User, 'createdAt' | 'updatedAt'>>;
export type TUserU = Pick<User, 'id'> & Partial<User>;
