import Joi from 'joi';

export const idParamValidator = Joi.object<{ id: number }>({
  id: Joi.number().integer().required(),
});
