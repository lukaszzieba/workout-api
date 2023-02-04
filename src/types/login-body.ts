import { User } from '@routes/user/user-entity';

export type LoginBody = Pick<User, 'email' | 'password'>;
