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

// TODO
// it can be one validator
export const paramsValidationZ =
  (schema: Zod.Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params);
      schema.parse(req.params);
      return next();
    } catch (error) {
      console.log(error);
      return next(new AppError(StatusCodes.BAD_REQUEST, 'Wrong id param'));
    }
  };

export const bodyValidationZ =
  (schema: Zod.Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      return next(new AppError(StatusCodes.BAD_REQUEST, 'Wrong eq body'));
    }
  };
