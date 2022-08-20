import { Request, Response, NextFunction } from 'express';
import AppError from './error/error';
import { StatusCodes } from './htttp-statuses';

export const withErrorHandler =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn();
      res.json(data);
    } catch (error) {
      next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'));
    }
  };
