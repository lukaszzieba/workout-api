import { Service } from '@types';
import { Training as TrainingEntity } from '@db/types/generated';
import { Exercise } from '@routes/exercise/types';

export type Training = Pick<TrainingEntity, 'name' | 'shortDescription' | 'description'> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
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
