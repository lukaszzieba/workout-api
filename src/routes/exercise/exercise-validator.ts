import Joi from 'Joi';
import { TExerciseEntityI, TExerciseEntityU } from '@routes/exercise/types';

export const exerciseCrateValidator = Joi.object<TExerciseEntityI>({
  name: Joi.string().required(),
  shortDescription: Joi.string().alphanum().required(),
  description: Joi.string().required(),
});

export const exerciseUpdateValidator = Joi.object<TExerciseEntityU>({
  name: Joi.string().optional(),
  shortDescription: Joi.string().alphanum().optional(),
  description: Joi.string().optional(),
});
