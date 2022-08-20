import { BaseEntity } from '../types/base-entity';

export interface Exercise extends BaseEntity {
  name: string;
  shortName?: string;
  description: string;
}

export type TExerciseI = Pick<Exercise, 'name' | 'shortName' | 'description'> &
  Partial<Pick<Exercise, 'createdAt' | 'updatedAt'>>;
export type TExerciseU = Pick<Exercise, 'id'> & Partial<Exercise>;
