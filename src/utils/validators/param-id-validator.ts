import Joi from 'joi';
import Zod from 'Zod';

export const idParamValidator = Joi.object<{ id: number }>({
  id: Joi.number().integer().required(),
});

const validNumber = Zod.coerce.number().int().positive();

export const idParamValidatorZ = Zod.object({
  id: validNumber,
});
