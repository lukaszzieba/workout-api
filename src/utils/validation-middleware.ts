import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import AppError from './error/error';
import { StatusCodes } from './htttp-statuses';

export const validationMiddleware =
  <T>(schema: Joi.ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // TODO
      // for easier front end implementation  i should return error.details od something similar
      // console.log(error.details)
      const errorMessage = error.details;
      console.log(errorMessage);
      return next(new AppError(StatusCodes.BAD_REQUEST, errorMessage.toString()));
    }

    return next();
  };
