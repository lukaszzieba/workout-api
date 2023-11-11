import { z } from 'zod';

export const trainingCrateValidator = z.object({
  name: z.string().nonempty(),
  shortDescription: z.string(),
  description: z.string(),
});

export const trainingUpdateValidator = z.object({
  name: z.string().nonempty().optional(),
  shortDescription: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
});
