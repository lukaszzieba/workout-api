import { BaseEntity, Service } from '@types';
import { Exercise } from '@routes/exercise/types';

export interface TrainingEntity extends BaseEntity {
  name: string;
  shortDescription?: string;
  description: string;
  planId: number;
  userId: number;
}
export type TTrainingEntityI = Pick<
  TrainingEntity,
  'name' | 'shortDescription' | 'description' | 'userId'
>;
export type TTrainingEntityU = Partial<TTrainingEntityI>;

export type TrainingService = Service<Training, TTrainingEntityI, TTrainingEntityU> & {
  getByPlanId: (planId: number) => Promise<Training[]>;
};

export type Training = Pick<TrainingEntity, 'id' | 'name' | 'shortDescription' | 'description'> & {
  exercises?: ExerciseForTraining[];
};

export type ExerciseForTraining = Exercise & {
  sets: number;
  reps: number;
  tempo: string | null;
  rest: string | null;
};
