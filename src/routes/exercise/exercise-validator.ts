import { z } from 'zod';

export const exerciseCrateValidator = z.object({
  name: z.string().nonempty(),
  shortDescription: z.string(),
  description: z.string(),
});

export const exerciseUpdateValidator = z.object({
  name: z.string().nonempty().optional(),
  shortDescription: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
});
