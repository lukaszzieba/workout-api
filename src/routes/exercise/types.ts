import { BaseEntity, Service } from '@types';

export type ExerciseEntity = BaseEntity & {
  name: string;
  shortDescription?: string;
  description?: string;
  userId: number;
};
export type TExerciseEntityI = Pick<ExerciseEntity, 'name' | 'shortDescription' | 'description'>;
export type TExerciseEntityU = Partial<TExerciseEntityI>;

export type ExerciseService = Service<ExerciseEntity, TExerciseEntityI, TExerciseEntityU>;

export type Exercise = Pick<ExerciseEntity, 'id' | 'name' | 'shortDescription' | 'description'>;
