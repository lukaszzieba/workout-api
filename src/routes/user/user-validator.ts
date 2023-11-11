import { z } from 'zod';

export const userCrateValidator = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
});

export const userUpdateValidator = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.date(),
});
