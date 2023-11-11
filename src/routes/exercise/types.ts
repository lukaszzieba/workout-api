import { Service } from '@types';
import { User } from '@routes/user/types';
import { Exercise as ExerciseEntity } from '@db/types/generated';

export type Exercise = Pick<ExerciseEntity, 'name' | 'shortDescription' | 'description'> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
};

export type TExerciseEntityI = Pick<
  ExerciseEntity,
  'name' | 'shortDescription' | 'description'
> & {};

export type TExerciseEntityU = Partial<TExerciseEntityI>;

export type ExerciseService = Service<Exercise, TExerciseEntityI, TExerciseEntityU>;
