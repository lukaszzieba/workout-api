import Joi from 'Joi';
import { TTrainingI, TTrainingU } from './training-entity';

export const trainingCrateValidator = Joi.object<TTrainingI>({
  name: Joi.string().required(),
  shortDescription: Joi.string().required(),
  description: Joi.string().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export const trainingUpdateValidator = Joi.object<TTrainingU>({
  name: Joi.string().optional(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});
