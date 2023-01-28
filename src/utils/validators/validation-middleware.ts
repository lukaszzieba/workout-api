import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '@utils/error';
import { StatusCodes } from '@utils/htttp-statuses';

export const bodyValidation =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    const isEmpty = Object.keys(req.body).length === 0;

    if (error) {
      const { details } = error;
      return next(new AppError(StatusCodes.BAD_REQUEST, 'Worng req body', details));
    }

    if (isEmpty) {
      return next(new AppError(StatusCodes.BAD_REQUEST, 'Object is empty'));
    }

    return next();
  };

export const paramsValidation =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      const { details } = error;
      return next(new AppError(StatusCodes.BAD_REQUEST, 'Wrong id param', details));
    }

    return next();
  };
