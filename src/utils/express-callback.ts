import { NextFunction, Request, Response } from 'express';
import { DatabaseError } from 'pg';
import AppError from './error/error';
import { StatusCodes } from './htttp-statuses';
import { MyRequest } from '../types/my-request';

export const createExpressCallback =
  (handler: (myRequest: MyRequest) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myReq = { ...req };
      console.log('User id from session:', req.session.userId);
      const data = await handler(myReq);
      res.json(data);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return next(error);
      }

      if (error instanceof DatabaseError) {
        // TODO
        // Create messages by error code nad messages
        return next(new AppError(StatusCodes.BAD_REQUEST, 'Database error'));
      }

      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
