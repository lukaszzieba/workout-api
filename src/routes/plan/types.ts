import { Plan as PlanEntity } from '@db/types/generated';

export type Plan = Pick<PlanEntity, 'name' | 'description'> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TPlanI = Pick<Plan, 'name' | 'description'>;
export type TPlanU = Partial<Plan>;
