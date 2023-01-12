import { MyRequest } from '../types/my-request';
import { Service } from '../types/service-interface';
import { User, TUserI, TUserU } from './user-entity';
import { HashUtil } from '../types/hash-util';
import AppError from '../utils/error/error';
import { StatusCodes } from '../utils/htttp-statuses';
import { LoginBody } from '../types/login-body';
import { TExerciseU } from '../exercise/exercise-entity';

type UserService = Service<User, TUserI, TUserU>;

const userMapper = ({ id, name, lastname, email, createdAt, updatedAt }: User) => ({
  id,
  name,
  lastname,
  email,
  createdAt,
  updatedAt,
});

export const getAllUserHandler = (userService: UserService) => async () =>
  await userService.getAll();

export const getOneUserHandler =
  (userService: UserService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    return await userService.getOne(+id);
  };

export const updateOneUserHandler =
  (userService: UserService) =>
  async ({ params: { id }, body }: MyRequest<TExerciseU, { id: number }>) => {
    return await userService.update(id, body);
  };

export const deleteOneUserHandler =
  (userService: UserService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    return await userService.deleteOne(id);
  };

export const createUserHandler =
  (userService: UserService, hashUtil: HashUtil) => async (req: MyRequest) => {
    const { body } = req;
    const { password } = body;
    const hashedPassword = await hashUtil.hash(password);
    const user = await userService.create({ ...body, password: hashedPassword });
    req.session.userId = user.id;

    return userMapper(user);
  };

export const loginHandler =
  (userService: UserService, hashUtil: HashUtil) => async (req: MyRequest<LoginBody>) => {
    const { email, password } = req.body;

    const user = await userService?.getOneByEmail?.(email);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    const match = await hashUtil.verify(user.password as string, password as string);

    if (!match) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Wrong login or password');
    }

    if (req.session) {
      req.session.userId = user.id;
    }

    return userMapper(user);
  };
