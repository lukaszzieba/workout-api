import { Generated } from 'kysely';
import { Service } from '@types';
import { Exercise } from '@routes/exercise/types';

export interface TrainingEntity {
  id: Generated<number>;
  createdAt: Generated<string>;
  updatedAt: Generated<string>;
  name: string;
  shortDescription?: string;
  description: string;
  planId?: number;
  userId?: number;
}

export type Training = Pick<TrainingEntity, 'name' | 'shortDescription' | 'description'> & {
  id: number;
  createdAt: string;
  updatedAt: string;
  exercises?: ExerciseForTraining[];
};

export type TTrainingEntityI = Pick<Training, 'name' | 'shortDescription' | 'description'>;
export type TTrainingEntityU = Partial<TTrainingEntityI>;

export type TrainingService = Service<Training, TTrainingEntityI, TTrainingEntityU> & {
  getByPlanId: (planId: number) => Promise<Training | undefined>;
};

export type ExerciseForTraining = Pick<
  Exercise,
  'id' | 'name' | 'shortDescription' | 'description'
> & {
  sets: number;
  reps: number;
  tempo: string | null;
  rest: string | null;
};
