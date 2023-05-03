import { Generated } from 'kysely';
import { Training } from '@routes/training/types';

export interface PlanEntity {
  id: Generated<number>;
  createdAt: Generated<string>;
  updatedAt: Generated<string>;
  name: string;
  description: string;
}

export type Plan = Pick<PlanEntity, 'name' | 'description'> & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type TPlanI = Pick<Plan, 'name' | 'description'>;
export type TPlanU = Partial<Plan>;
