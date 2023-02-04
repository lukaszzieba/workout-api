import Joi from 'Joi';
import { TUserEntityI, TUserEntityU } from '@routes/user/types';

export const userCrateValidator = Joi.object<TUserEntityI>({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const userUpdateValidator = Joi.object<TUserEntityU>({
  name: Joi.string().optional(),
  lastname: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.date().optional(),
});
