import Joi from 'Joi';
import { TExerciseI, TExerciseU } from './exercise-entity';

export const exerciseCrateValidator = Joi.object<TExerciseI>({
  name: Joi.string().alphanum().required(),
  shortName: Joi.string().alphanum().required(),
  description: Joi.string().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export const exerciseUpdateValidator = Joi.object<TExerciseU>({
  name: Joi.string().alphanum().optional(),
  shortName: Joi.string().alphanum().optional(),
  description: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});
