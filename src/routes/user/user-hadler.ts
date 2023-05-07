import { MyRequest, HashUtil } from '@types';
import AppError from '@utils/error/error';
import { StatusCodes } from '@utils/htttp-statuses';
import { TUserEntityU, UserService, User, LoginBody } from '@routes/user/types';

const userMapper = ({
  id,
  name,
  lastname,
  email,
}: User): Pick<User, 'id' | 'name' | 'lastname' | 'email'> => ({
  id,
  name,
  lastname,
  email,
});

export const getAllUserHandler = (userService: UserService) => async () => {
  const users = await userService.getAll();

  if (!users) {
    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  }

  return users.map(userMapper);
};

export const getOneUserHandler =
  (userService: UserService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const user = await userService.getOne(id);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return userMapper(user);
  };

export const updateOneUserHandler =
  (userService: UserService) =>
  async ({ params: { id }, body }: MyRequest<TUserEntityU, { id: number }>) => {
    const user = await userService.update(id, body);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return userMapper(user);
  };

export const deleteOneUserHandler =
  (userService: UserService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const deleted = await userService.deleteOne(id);

    if (!deleted) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return deleted;
  };

export const createUserHandler =
  (userService: UserService, hashUtil: HashUtil) => async (req: MyRequest) => {
    const { body } = req;
    const { password } = body;
    const hashedPassword = await hashUtil.hash(password);
    const user = await userService.create({ ...body, password: hashedPassword });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

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
