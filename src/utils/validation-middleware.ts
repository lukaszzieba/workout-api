import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import AppError from './error/error';
import { StatusCodes } from './htttp-statuses';

export const validationMiddleware =
  <T>(schema: Joi.ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new AppError(StatusCodes.BAD_REQUEST, errorMessage));
    }

    return next();
  };
