import { User } from '../user/user-entity';

export type LoginBody = Pick<User, 'email' | 'password'>;
