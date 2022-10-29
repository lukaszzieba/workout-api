import { MyRequest } from '../types/my-request';
import { Service } from '../types/service-interface';
import { User, TUserI, TUserU } from './user-entity';
import { getParamId } from '../utils/req';
import { HashUtil } from '../types/hash-util';
import AppError from '../utils/error/error';
import { StatusCodes } from '../utils/htttp-statuses';
import { LoginBody } from '../types/login-body';

type UserService = Service<User, TUserI, TUserU>;

export const createGetAllUserHandler = (userService: UserService) => async () =>
  await userService.getAll();

export const createGetOneUserHandler = (userService: UserService) => async (req: MyRequest) => {
  const id = getParamId(req);

  return await userService.getOne(+id);
};

export const createUpdateOneUserHandler = (userService: UserService) => async (req: MyRequest) => {
  const id = getParamId(req);
  const { body } = req;

  return await userService.update(id, body);
};

export const createDeleteOneUserHandler = (userService: UserService) => async (req: MyRequest) => {
  const id = getParamId(req);

  return await userService.deleteOne(id);
};

export const createCreateUserHandler =
  (userService: UserService, hashUtil: HashUtil) => async (req: MyRequest) => {
    const { body } = req;
    const { password } = body;
    const hashedPassword = await hashUtil.hash(password);
    const user = await userService.create({ ...body, password: hashedPassword });
    req.session.userId = user.id;

    return user;
  };

export const createLoginHandler =
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

    return { ...user, password: null };
  };
