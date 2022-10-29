import Joi from 'Joi';
import { TUserI, TUserU } from './user-entity';

export const userCrateValidator = Joi.object<TUserI>({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export const userUpdateValidator = Joi.object<TUserU>({
  name: Joi.string().optional(),
  lastname: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});
