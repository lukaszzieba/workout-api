import { MyRequest } from '../types/my-request';
import AppError from './error/error';
import { StatusCodes } from './htttp-statuses';

// TODO
// Remove that. Move validation logic tp middleware
export const getParamId = (req: MyRequest): number => {
  if (!req?.params || !req.params?.id) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Id is missing');
  }

  const id = Number(req.params.id);

  if (isNaN(id))
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Id is not a number. Id passed as argument: ${req.params.id}`,
    );

  return id;
};
