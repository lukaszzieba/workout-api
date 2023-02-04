import { Training } from '@routes/training/training-entity';
import { BaseEntity } from '@types';

export interface Plan extends BaseEntity {
  name: string;
  description: string;
  trainings: Training[];
}

export type TPlanI = Pick<Plan, 'name' | 'description'> &
  Partial<Pick<Plan, 'createdAt' | 'updatedAt'>>;
export type TPlanU = Pick<Plan, 'id'> & Partial<Plan>;
