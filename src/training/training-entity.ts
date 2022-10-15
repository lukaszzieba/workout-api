import { Exercise } from 'src/exercise/exercise-entity';
import { BaseEntity } from '../types/base-entity';

export interface Training extends BaseEntity {
  name: string;
  shortDescription?: string;
  description: string;
  exercises: Exercise & { sets: number; reps: number; tempo?: string }[];
}

export type TTrainingI = Pick<Training, 'name' | 'shortDescription' | 'description'> &
  Partial<Pick<Training, 'createdAt' | 'updatedAt'>>;
export type TTrainingU = Pick<Training, 'id'> & Partial<Training>;
