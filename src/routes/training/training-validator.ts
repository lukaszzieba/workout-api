import Joi from 'Joi';
import { TTrainingEntityI, TTrainingEntityU } from '@routes/training/types';

export const trainingCrateValidator = Joi.object<TTrainingEntityI>({
  name: Joi.string().required(),
  shortDescription: Joi.string().required(),
  description: Joi.string().required(),
});

export const trainingUpdateValidator = Joi.object<TTrainingEntityU>({
  name: Joi.string().optional(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
});
