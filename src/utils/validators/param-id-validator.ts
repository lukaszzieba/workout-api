import z from 'Zod';

const validNumber = z.coerce.number().int().positive();

export const idParamValidator = z.object({
  id: validNumber,
});
