import { NextFunction, Request, Response } from 'express';
import AppError from './error/error';
import { StatusCodes } from './htttp-statuses';
import { MyRequest } from '../types/my-request';

export const createExpressCallback =
  (handler: (myRequest: MyRequest) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myReq = { ...req };

      const data = await handler(myReq);
      res.json(data);
    } catch (error) {
      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
