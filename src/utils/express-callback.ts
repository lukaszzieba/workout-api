import { NextFunction, Request, Response } from 'express';
import { DatabaseError } from 'pg';
import { AppError } from '@utils/error';
import { StatusCodes } from '@utils/htttp-statuses';

export const createExpressCallback =
  (handler: (req: any) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myReq = { ...req };
      const data = await handler(myReq);
      res.json(data);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return next(error);
      }

      if (error instanceof DatabaseError) {
        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Database error'));
      }

      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
