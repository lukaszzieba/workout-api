import { BaseEntity } from '../types/base-entity';

export type Exercise = BaseEntity & {
  name: string;
  shortDescription?: string;
  description?: string;
  userId: number;
};

export type TExerciseI = Pick<Exercise, 'name' | 'shortDescription' | 'description'> &
  Partial<Pick<Exercise, 'createdAt' | 'updatedAt'>>;
export type TExerciseU = Pick<Exercise, 'id'> & Partial<Exercise>;
