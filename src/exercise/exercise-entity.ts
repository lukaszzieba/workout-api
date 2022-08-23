import { BaseEntity } from '../types/base-entity';

export interface Exercise extends BaseEntity {
  name: string;
  shortDescription?: string;
  description: string;
}

export type TExerciseI = Pick<Exercise, 'name' | 'shortDescription' | 'description'> &
  Partial<Pick<Exercise, 'createdAt' | 'updatedAt'>>;
export type TExerciseU = Pick<Exercise, 'id'> & Partial<Exercise>;
